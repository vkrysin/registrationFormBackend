import mongoose from "mongoose";

import { mongoConnect } from "../mongoDb.js";
import { services } from "./services.js";

const serviceScheme = new mongoose.Schema({
  name: String,
  price: Number,
  duration: String,
});

export const Service = mongoose.model("Service", serviceScheme);

// init();

// инициализация услуг, которые оказывает мастерская
function init() {
  mongoConnect()
    .then(async () => {
      await Service.insertMany(services);
      console.log("Services inserted successfully!");
    })
    .catch((err) => console.log(err))
    .finally(() => {
      mongoose.connection.close();
    });
}
