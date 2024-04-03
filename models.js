import mongoose, { Schema } from "mongoose";

const masterScheme = new Schema({
  name: String,
  appointment: {
    type: new Schema({
      clientName: String,
      phone: String,
      email: String,
      comment: String,
      date: String,
      time: String,
    }),
  },
});

const serviceScheme = new Schema({
  name: String,
  price: Number,
  duration: String,
});

export const Master = mongoose.model("Master", masterScheme);
export const Service = mongoose.model("Service", serviceScheme);
