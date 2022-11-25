const { extname, dirname } = require("path");
const { mkdir } = require("fs");
const multer = require("multer");

//  uploaded folder
const UPLOADED_FOLDER = `${__dirname}/../public/uploads/`;


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOADED_FOLDER);
  },
  filename: (req, file, cb) => {
    const ext = extname(file.originalname);
    const customName =
      file.originalname.trim().replace(ext, "").split(" ").join("_") +
      "_" +
      Date.now() +
      ext;
    cb(null, customName);
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png"
    ) {
        cb(null,true);
    }else{
        cb(new Error("Only JPG,PNG,JPEG accept."));
    }
  },
  limits:{
    fileSize:	5242880,
  }
});
module.exports = {upload};
