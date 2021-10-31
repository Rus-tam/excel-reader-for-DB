const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({
  temperature: {
    type: Number,
  },
  kinematicViscosity: {
    type: Number,
  },
  thermalConductivity: {
    type: Number,
  },
  dynamicViscosity: {
    type: Number,
  },
  massDensity: {
    type: Number,
  },
  material: {
    type: String,
  },
});

const Material = mongoose.model("Material", materialSchema);

module.exports = Material;
