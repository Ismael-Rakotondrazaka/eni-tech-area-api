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

        const title = "Welcome to the ENI-OVERFLOW";

        const text = `Hi, ${user.name.full}.\nPlease read carefully.\nHere is your password: ${password}.\n We recommend you to change it in the link ${frontendURL}/?first=true&token=${accessToken}`;

        await sendEmail({
          from: emailSender,
          to: user.email,
          subject: "ENI-OVERFLOW",
          text: `Ecole Nationale d'Informatique

${title}

${text}`,
          html: `<header style="padding:0 0.2rem">
  <img style="display:block;width:40%;margin-bottom:0.5rem;max-width:200px;margin-left:auto;margin-right:auto;" src="https://api.dicebear.com/5.x/thumbs/svg" alt="Logo ENI"/>
  
  <h1 style="color:#000;text-align:center;font-height:bold;">Ecole Nationale d'Informatique</h1>
</header>

<hr />

<main>

<h1 style="font-height:bold;">${title}</h1>

<h2>Hi ${user.name.full}</h2>

<p>Please, read carefully</p>

<p>Here is your password: <em>${password}</em></p>

<p>We recommande you to change it in this link: <a href="${frontendURL}/?first=true&token=${accessToken}">${frontendURL}/?first=true&token=${accessToken}</a></p>

</main>
`,
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
