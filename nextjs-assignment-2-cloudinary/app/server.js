import "dotenv/config";
import express from "express";
import multer from "multer";
import {
  MongoClient,
  GridFSBucket,
  GridFSBucketReadStream,
  GridFSBucketWriteStream,
} from "mongodb";
import { v2 as cloudinary } from "cloudinary";
import path from "node:path";
import fs from "fs";

const app = express();
const port = 3001;
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const db = client.db("Instagram");
const coll = db.collection("users");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const imagePath = "./public//uploads/mongo_hierarchy2.png";
const uploadImage = async (imagePath) => {
  try {
    if (!imagePath) return null;
    const result = await cloudinary.uploader.upload(imagePath, {
      resource_type: "auto",
    });
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error: ", error);
    return null;
  }
};
await uploadImage(imagePath);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/");
  },
  filename: function (req, file, cb) {
    // cb(null, `${Date.now()}-${file.originalname}`);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/upload", upload.single("file"), function (req, res, next) {
  res.json(req.file);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
