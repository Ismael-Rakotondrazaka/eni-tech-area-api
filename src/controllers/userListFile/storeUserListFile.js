import dotenv from "dotenv";
import { createRandomString, sendEmail, textEmailToHTML } from "../../utils/index.js";
import readXlsxFile from 'read-excel-file/node'
import {User} from "../../models/index.js";

dotenv.config();

const emailSender = process.env.EMAIL_SENDER;
const storeUserListFile = async (req, res, next) => {

  try {
    let studentList = [];
    let allEmail= "";
    const data = await readXlsxFile(Buffer.from(req.file.buffer))
    const tempPasswordLength = 8;
    for (let i = 1; i < data.length; i++) {
      studentList.push({
        lastName: data[i][0], firstName: data[i][1], email: data[i][2], matricula: data[i][3] || null, level: data[i][4] || null, gender: data[i][5], role: data[i][6], channelId: createRandomString(), password: createRandomString(tempPasswordLength)
      })
      allEmail = allEmail + ", " + data[i][2];
    }

    await User.bulkCreate(studentList)
    const title = "ARNaud";
    const text = "ARNaud";
    console.log(allEmail)
    await sendEmail({
      from: emailSender,
      to: allEmail,
      subject: "INSCRIPTION à ENI-OVERFLOW",
      text: `Ecole Nationale d'Informatique

${title}

${text}`,
      html: `<header style="padding:0 0.2rem">
  <img style="display:block;width:40%;margin-bottom:0.5rem;max-width:200px;margin-left:auto;margin-right:auto;" src="https://api.dicebear.com/5.x/thumbs/svg" alt="Logo ENI"/>
  
  <h1 style="color:#000;text-align:center;font-height:bold;">Ecole Nationale d'Informatique</h1>
</header>

<hr />

<main>

<h1 style="font-height:bold;"></h1>



</main>
`,
sendEmail
    });
    res.sendStatus("204");

  } catch (error) {
    next(error);
  }
};

export { storeUserListFile };
