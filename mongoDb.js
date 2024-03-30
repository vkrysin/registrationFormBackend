import mongoose from "mongoose";

import { services } from "./services.js";

const dev_db_url = "mongodb://127.0.0.1:27017/test";
const mongoDB = process.env.MONGODB_URI || dev_db_url;

export async function mongoConnect() {
  await mongoose.connect(mongoDB);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const serviceScheme = new mongoose.Schema({
  name: String,
  price: Number,
  duration: String,
});

export const Service = mongoose.model("Service", serviceScheme);

// insert();
// async function insert() {
//   await Service.insertMany(services);
// }
