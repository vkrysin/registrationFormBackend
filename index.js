import { mongoConnect } from "./mongoDb.js";

import { Service, Master } from "./models.js";

import express from "express";
const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  // res.send(re.name);
});

// get haircuts endpoint

app.get("/haircut-services", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const services = await Service.find({}).then((res) =>
    res.map((service) => {
      return {
        id: service.id,
        name: service.name,
        price: service.price,
        duration: service.duration,
      };
    })
  );

  res.json(services);
});

app.get("/masters", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const masters = await Master.find({}).then((res) =>
    res.map((master) => {
      return {
        id: master.id,
        name: master.name,
        appointment: master.appointment,
      };
    })
  );

  // group by master name
  const mastersGroupByName = masters.reduce((acc, cur) => {
    if (!acc[cur.name]) {
      acc[cur.name] = {};
    }

    if (!acc[cur.name][cur.appointment.date]) {
      acc[cur.name][cur.appointment.date] = {};
    }

    acc[cur.name][cur.appointment.date][cur.appointment.time] = {
      id: cur.id,
      appointment: {
        clientName: cur.appointment.clientName,
        phone: cur.appointment.phone,
        email: cur.appointment.email,
        comment: cur.appointment.comment,
      },
    };

    return acc;
  }, {});

  res.json(mastersGroupByName);
});

mongoConnect().catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
