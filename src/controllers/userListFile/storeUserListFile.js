import dotenv from "dotenv";
import {
  createDataResponse,
  BadRequestError,
  createRandomString,
  sendEmail,
  hashPassword,
  createAccessToken,
} from "../../utils/index.js";
import readXlsxFile from "read-excel-file/node";
import { User } from "../../models/index.js";
import { userCollection } from "../../resources/index.js";

dotenv.config();

const emailSender = process.env.EMAIL_SENDER;
const frontendURL = process.env.FRONTEND_URL;

const storeUserListFile = async (req, res, next) => {
  try {
    const studentListRaw = [];

    let allEmail = "";

    const studentFileList = req.file;

    if (!studentFileList)
      throw new BadRequestError({
        message: "studentFileList is missing",
        code: "E2_",
      });

    const excelData = await readXlsxFile(Buffer.from(studentFileList.buffer));

    const tempPasswordLength = 8;

    for (let i = 1; i < excelData.length; i++) {
      const password = createRandomString(tempPasswordLength);
      studentListRaw.push({
        lastName: excelData[i][0],
        firstName: excelData[i][1],
        email: excelData[i][2],
        matricula: excelData[i][3] || null,
        level: excelData[i][4] || null,
        gender: excelData[i][5],
        role: excelData[i][6],
        channelId: createRandomString(),
        hashedPassword: hashPassword(password),
        password,
      });
      allEmail = allEmail + ", " + excelData[i][2];
    }

    const emailPassword = {};

    studentListRaw.forEach((user) => {
      emailPassword[user.email] = user.password;
    });

    const temp = await User.bulkCreate(
      studentListRaw.map((student) => ({
        lastName: student.lastName,
        firstName: student.firstName,
        email: student.email,
        matricula: student.matricula,
        level: student.level,
        gender: student.gender,
        role: student.role,
        channelId: student.channelId,
        password: student.hashedPassword,
      }))
    );

    // ! can be slow
    const targetUsers = await Promise.all(
      temp.map(async (user) => {
        return user.reload();
      })
    );

    const targetUsersResources = userCollection(targetUsers);

    await Promise.all(
      targetUsersResources.map(async (user) => {
        const accessToken = createAccessToken({
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        });

        const password = emailPassword[user.email];

        const title = "Welcome to ENI tech area";

        const text = `Hi, ${user.name.full}.\nPlease read carefully.\nHere is your password: ${password}.\n We recommend you to change it in the link ${frontendURL}/login?first=true&token=${accessToken}`;

        await sendEmail({
          from: emailSender,
          to: user.email,
          subject: "ENI tech area",
          text: `Ecole Nationale d'Informatique

${title}

${text}`,
          html: `<body
          style="
            margin-left: auto;
            width: 90%;
            max-width: 1024px;
            margin-right: auto;
            font-family: sans-serif;
          "
        >
          <header style="padding: 0 0.2rem">
            <img
              style="
                display: block;
                width: 40%;
                margin-bottom: 0.5rem;
                max-width: 200px;
                margin-left: auto;
                margin-right: auto;
              "
              src="https://storage.googleapis.com/mi-chat-storage.appspot.com/1678523987651.jpg"
              alt="Logo ENI"
            />
        
            <h1 style="color: #000; text-align: center; font-weight: bold">
              Ecole Nationale d'Informatique
            </h1>
          </header>
        
          <hr />
        
          <main>
            <h1 style="font-weight: bold">${title}</h1>
        
            <h2>Dear ${user.name.full},</h2>
            <p>
              We are delighted to welcome you to the ENI Tech Area platform. We are
              thrilled that you have decided to join our community of learners, and we
              are confident that this platform will provide you with an enriching
              educational experience.
            </p>
        
            <p>
              We are pleased to inform you that your account has been successfully
              created on the platform. <br />
              Your default password is:
              <em style="font-style: normal; font-weight: bold">${password}</em><br />
              We would like to remind you to keep your password secure and not share it
              with anyone. It is also advisable to change your password as soon as
              possible to ensure the security of your account.
            </p>
        
            <p>
              To change your password, please click on the following link: <br />
              <a
                href="${frontendURL}/login?first=true&token=${accessToken}"
                style="
                  background-color: #01baef;
                  padding: 1rem;
                  display: inline-block;
                  text-decoration: none;
                  color: #fff;
                  font-weight: bold;
                  border-radius: 0.3rem;
                  box-shadow: #000 0px 1px 2px;
                  margin-top: 0.3rem;
                  margin-bottom: 0.3rem;
                "
                >Change password</a
              >
              <br />
              You will be prompted to enter your default password, and then you will be
              able to set your new password.
            </p>
        
            <p>
              We encourage you to explore the platform and take advantage of the many
              resources and tools available to you. We believe that this platform will
              enhance your learning experience and provide you with the skills and
              knowledge necessary to achieve your goals.
            </p>
        
            <p>
              If you have any questions or concerns, please do not hesitate to contact
              us at [insert contact email].
            </p>
        
            <p>
              Thank you for joining our platform, and we look forward to supporting you
              in your academic journey.
            </p>
        
            <p>Best regards,</p>
        
            <p style="text-align: right">ENI Tech Area administrator</p>
          </main>
        </body>`,
        });
      })
    );

    const data = {
      users: targetUsersResources,
    };

    const dataResponse = createDataResponse({
      data,
      request: req,
    });

    res.json(dataResponse);
  } catch (error) {
    next(error);
  }
};

export { storeUserListFile };
