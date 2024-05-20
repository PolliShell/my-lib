require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { Pool } = require("pg");

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
    bucket: process.env.BUCKET,
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
});

app_aws.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app_aws.post("/upload", upload.single("file"), async function (req, res, next) {
  res.send("Successfully uploaded " + req.file.location + " location!");
});

app_aws.get("/list", async (req, res) => {
  let r = await s3.listObjectsV2({ Bucket: BUCKET }).promise();
  let x = r.Contents.map((item) => item.Key);
  res.send(x);
});

app_aws.get("/download/:filename", async (req, res) => {
  const filename = req.params.filename;
  let x = await s3.getObject({ Bucket: BUCKET, Key: filename }).promise();
  res.send(x.Body);
});

app_aws.delete("/delete/:filename", async (req, res) => {
  const filename = req.params.filename;
  await s3.deleteObject({ Bucket: BUCKET, Key: filename }).promise();
  res.send("File Deleted Successfully");
});

module.exports = { app_aws, upload };
