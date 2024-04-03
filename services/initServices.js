import mongoose from "mongoose";

import { mongoConnect } from "../mongoDb.js";
import { services } from "./services.js";

import { Service } from "../models.js";

init();

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
