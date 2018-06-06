const mongoose = require("mongoose");

const { Schema } = mongoose;

const VehicleSchema = new Schema({
  make: String,
  model: String,
  color: String
});

module.exports = mongoose.model("Vehicle", VehicleSchema);
