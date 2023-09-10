const { Schema, model } = require("mongoose");
const filmSchema = new Schema({
  title: { type: String, required: [true, "db:title is required"] },
  year: { type: Number, required: [true, "db:year is required"] },
  language: { type: String, default: "ua" },
});
module.exports = model("film", filmSchema);
