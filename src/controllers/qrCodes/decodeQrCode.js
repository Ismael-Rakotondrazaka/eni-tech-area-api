import jsQR from "jsqr";
import Jimp from "jimp";

const decodeQrCode = async (req, res, next) => {
  try {
    const qrCode = req.file;

    if (!qrCode) { return res.sendStatus(400); }

    const jimp = await Jimp.read(qrCode.buffer);

    const decoded = jsQR(
      jimp.bitmap.data,
      jimp.bitmap.width,
      jimp.bitmap.height
    );

    if (!decoded) { return res.sendStatus(400); }

    const decodedData = JSON.parse(decoded.data);

    res.send(decodedData);
  } catch (error) {
    next(error);
  }
};

export { decodeQrCode };
