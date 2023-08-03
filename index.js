var express = require('express');
const multer = require("multer");
var cors = require("cors");
require("dotenv").config();

const upload = multer({ dest: "uploads/" });
var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), function (req, res) {
  // req.file is the name of your file in the form above, here 'uploaded_file'
  // req.body will hold the text fields, if there were any
  const fileInfo = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  };
  res.json(fileInfo);
  console.log(req.file, req.body);
});




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
