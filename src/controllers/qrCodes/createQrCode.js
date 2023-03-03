import { nanoid } from "nanoid";
import QRCode from "qrcode";
import { Writable } from "stream";

const createRandomString = (length) => {
  return nanoid(length);
};

const createQrCode = async (req, res, next) => {
  try {
    const {
      studentId = createRandomString(),
      firstName = createRandomString(),
      lastName = createRandomString(),
      matricula = createRandomString(),
    } = req.body;

    const data = {
      student: {
        id: studentId,
        matricula,
        name: {
          first: firstName,
          last: lastName,
          fullName: `${firstName} ${lastName}`,
        },
      },
      createdAt: new Date(),
    };

    const dataString = JSON.stringify(data);

    /* // Return a base64 string
    QRCode.toDataURL(dataString, (err, url) => {
      if (err) {
        next(err);
      }

      res.send(`<img src="${url}"/>`);
    }); */

    // return a downloadable file
    const contentType = "image/png";
    const fileName = `qr_code_${matricula}_${firstName}_${lastName}.png`;

    // Set headers for the response
    res.setHeader("Content-Type", contentType);
    res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);

    // Create a writable stream in memory
    const writableStream = new Writable({
      write(chunk, encoding, callback) {
        res.write(chunk);
        callback();
      },
    });

    writableStream.on("error", (err) => next(err));

    await QRCode.toFileStream(writableStream, dataString);

    writableStream.on("finish", () => {
      res.end();
    });
  } catch (error) {
    next(error);
  }
};

export { createQrCode };
