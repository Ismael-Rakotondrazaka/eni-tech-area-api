import dotenv from "dotenv";

import { sendEmail, textEmailToHTML } from "../../utils/index.js";
dotenv.config();

const emailSender = process.env.EMAIL_SENDER;

const storeEmail = async (req, res, next) => {
  try {
    const { to, title, text, subject } = req.body;
    const attachmentsArr = req.files;

    const textFormatted = textEmailToHTML(text, {
      style: "color:#333333;font-size:1rem;",
    });

    const attachments = attachmentsArr.map((attachmentObject) => ({
      filename: attachmentObject.originalname,
      encoding: attachmentObject.encoding,
      contentType: attachmentObject.mimetype,
      content: attachmentObject.buffer,
    }));

    await sendEmail({
      from: emailSender,
      to,
      subject,
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

${textFormatted}

</main>
`,
      attachments,
    });

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export { storeEmail };
