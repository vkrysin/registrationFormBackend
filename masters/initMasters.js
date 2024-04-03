import mongoose from "mongoose";

import { mongoConnect } from "../mongoDb.js";

import { Master } from "../models.js";

// инициализация услуг, которые оказывает мастерская
init();
function init() {
  mongoConnect()
    .then(async () => {
      await Master.insertMany(getMastersEmptySchedule());

      console.log("Masters inserted successfully!");
    })
    .catch((err) => console.log(err))
    .finally(() => {
      mongoose.connection.close();
    });
}

function getMastersEmptySchedule() {
  const mastersSchedule = [];
  const masterNames = ["Алексей", "Михаил", "Виктор", "Александр"];
  const dates = getNext30DaysUTC();
  const times = generateTimeStrings30min();

  masterNames.forEach((masterName) => {
    const result = {
      name: masterName,
      appointment: {},
    };

    dates.forEach((date) => {
      times.forEach((time) => {
        result.appointment = {
          clientName: "",
          serviceName: "",
          phone: "",
          email: "",
          comment: "",
          date,
          time,
        };
        mastersSchedule.push(JSON.parse(JSON.stringify(result)));
      });
    });
  });

  // console.log(mastersSchedule);
  return mastersSchedule;
}

// utc+0 30 дней, начиная со следующего дня
function getNext30DaysUTC() {
  const dateArray = [];
  const currentDate = new Date();
  const utcDate = new Date(
    currentDate.getUTCFullYear(),
    currentDate.getUTCMonth(),
    currentDate.getUTCDate() + 1
  );
  for (let i = 1; i <= 30; i++) {
    const date = new Date(
      Date.UTC(
        utcDate.getUTCFullYear(),
        utcDate.getUTCMonth(),
        utcDate.getUTCDate() + i
      )
    );
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    dateArray.push(`${month}-${day}-${year}`);
  }
  return dateArray;
}

// строки времени от 10:00 до 18:00
function generateTimeStrings30min() {
  const result = [];
  for (let i = 10; i <= 18; i++) {
    for (let j = 0; j < 2; j++) {
      const time = `${i.toString().padStart(2, "0")}-${(j * 30)
        .toString()
        .padStart(2, "0")}`;
      result.push(time);
    }
  }
  return result;
}
