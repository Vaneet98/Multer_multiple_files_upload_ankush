const express = require("express");

// MULTER
const multer = require("multer");

// PATH
const path = require("path");

const app = express();
const port = 8000;

app.set("view engine", "ejs");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage: storage });

var uploadMultiple = upload.fields([
  { name: "singleFile", maxCount: 10 },
  { name: "multipleFile", maxCount: 10 },
]);

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/uploadfile", uploadMultiple, (req, res, next) => {
  if (req.files) {
    console.log(req.files);
    console.log("files uploaded");
  }
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
