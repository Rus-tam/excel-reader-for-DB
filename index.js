const { excelReader, sheets } = require("./utils/excelHandler");
const Material = require("./model/material");
const mongoose = require("mongoose");
require("dotenv").config();

const data = excelReader(sheets);

const DB_URL = process.env.DB_URL;

const DBWriter = async (data) => {
  async function worker(data) {
    for (const doc of data) {
      const existingMaterial = await Material.find({
        $and: [{ material: doc.Material }, { temperature: doc.Temperature }],
      });
      if (existingMaterial.length > 0) {
        console.log(`${doc.Material} is currently exist!`);
      } else {
        const material = new Material({
          temperature: doc.Temperature,
          kinematicViscosity: doc.KinematicViscosity,
          thermalConductivity: doc.ThermalConductivity,
          dynamicViscosity: doc.DynamicViscosity,
          massDensity: doc.MassDensity,
          material: doc.Material,
        });
        await material.save();
      }
    }
  }
  await worker(data);
};

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Connecting to DB!");
    DBWriter(data).then(() => {
      console.log("Success");
    });
    // mongoose.connection
    //   .close()
    //   .then(() => {
    //     console.log("DB is disconnected!");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  })
  .catch((err) => {
    console.log(err);
  });
