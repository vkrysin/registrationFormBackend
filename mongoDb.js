import mongoose from "mongoose";

const dev_db_url = "mongodb://127.0.0.1:27017/test";
const mongoDB = process.env.MONGODB_URI || dev_db_url;

export async function mongoConnect() {
  await mongoose.connect(mongoDB);
}
