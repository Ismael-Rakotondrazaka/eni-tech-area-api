import dotenv from "dotenv";
import {Admin} from "../../models/index.js";
import { sendEmail, textEmailToHTML } from "../../utils/index.js";
import readXlsxFile from 'read-excel-file/node' 
const storeStudentFile = async (req, res, next) => {
  
  try {
    //const readExcel = require('read-excel-file/node');
    
    await readXlsxFile(Buffer.from(req.file.buffer)).then((data) => {
      //Admin.create({Name:"kjhkhj", Mobile: "sdfsd"});
      for (let i= 1;i<data.length; i++) {
        Admin.create({Name:data[i][0], Mobile: data[i][1]})
      }
    });
    res.send("6546");
    
  } catch (error) {
    next(error);
  }
};

export { storeStudentFile };
