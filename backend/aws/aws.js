require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const app_aws = express();
app_aws.use(bodyParser.json());
app_aws.use(bodyParser.urlencoded({ extended: true }));

aws.config.update({
  secretAccessKey: process.env.ACCESS_SECRET,
  accessKeyId: process.env.ACCESS_KEY,
  region: process.env.REGION,
});

const BUCKET = process.env.BUCKET;
const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    acl: "public-read",
    bucket: BUCKET,
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
});

app_aws.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app_aws.post("/upload", upload.single("file"), async function (req, res, next) {
  res.send("Файл успешно загружен по адресу: " + req.file.location);
});

app_aws.get("/list", async (req, res) => {
  try {
    let r = await s3.listObjectsV2({ Bucket: BUCKET }).promise();
    let keys = r.Contents.map((item) => item.Key);
    res.send(keys);
  } catch (err) {
    console.error("Ошибка при получении списка объектов:", err);
    res.status(500).send("Ошибка при получении списка объектов");
  }
});

app_aws.get("/download/:filename", async (req, res) => {
  const filename = req.params.filename;
  try {
    let data = await s3.getObject({ Bucket: BUCKET, Key: filename }).promise();
    res.send(data.Body);
  } catch (err) {
    console.error("Ошибка при загрузке файла:", err);
    res.status(500).send("Ошибка при загрузке файла");
  }
});

app_aws.delete("/delete/:filename", async (req, res) => {
  const filename = req.params.filename;
  try {
    await s3.deleteObject({ Bucket: BUCKET, Key: filename }).promise();
    res.send("Файл успешно удален");
  } catch (err) {
    console.error("Ошибка при удалении файла:", err);
    res.status(500).send("Ошибка при удалении файла");
  }
});

module.exports = { app_aws, upload };
