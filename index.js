import { mongoConnect, Service } from "./mongoDb.js";

import express from "express";
const app = express();
const port = 3000;

const haircuts = [
  {
    id: 1,
    name: "Патчи",
    price: 1099,
    duration: "15",
  },
];

app.get("/", async (req, res) => {
  // res.send(re.name);
});

// get haircuts endpoint

app.get("/haircut-services", async (req, res) => {
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

mongoConnect().catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
