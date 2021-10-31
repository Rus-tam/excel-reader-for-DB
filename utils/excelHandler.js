const reader = require("xlsx");
const file = reader.readFile("./test.xlsx");
const sheets = file.SheetNames;

const excelReader = (sheets) => {
  let temp = [];
  let data = [];
  let result = [];

  for (let i = 0; i < sheets.length; i++) {
    temp = reader.utils.sheet_to_json(file.Sheets[sheets[i]]);
    data.push(temp);
  }

  for (let i = 0; i < data.length; i++) {
    data[i].forEach((elem) => {
      elem.Material = sheets[i];
      result.push(elem);
    });
  }

  return result;
};

// const dataFormation = (data, sheets) => {
//   let newData = [];
//   for (let i = 0; i < data.length; i++) {
//     let tempDocument = {};
//     let temperature = [];
//     let kinematicViscosity = [];
//     let thermalConductivity = [];
//     let dynamicViscosity = [];
//     let massDensity = [];
//     let material = "";
//     data[i].forEach((elem) => {
//       temperature.push(elem.Temperature);
//       kinematicViscosity.push(elem.KinematicViscosity);
//       thermalConductivity.push(elem.ThermalConductivity);
//       dynamicViscosity.push(elem.DynamicViscosity);
//       massDensity.push(elem.MassDensity);
//       material = sheets[i];
//     });
//     tempDocument = {
//       temperature,
//       kinematicViscosity,
//       thermalConductivity,
//       dynamicViscosity,
//       massDensity,
//       material,
//     };
//     newData.push(tempDocument);
//   }
//   return newData;
// };

module.exports = { excelReader, sheets };
