import { mongoConnect } from "./mongoDb.js";

import { Service, Master } from "./models.js";

import bodyParser from "body-parser";
import express from "express";
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

// add appointment
app.post("/appointment", async (req, res) => {
  const master = await Master.findOneAndUpdate(
    {
      "appointment.date": req.body.date,
      "appointment.time": req.body.time,
      name: req.body.master,
    },
    {
      $set: {
        appointment: {
          clientName: req.body.clientName,
          phone: req.body.phone,
          email: req.body.email,
          comment: req.body.comment,
          date: req.body.date,
          time: req.body.time,
          serviceName: req.body.serviceName,
        },
      },
    }
  );

  res.json({
    success: true,
    master,
  });
});

mongoConnect().catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
