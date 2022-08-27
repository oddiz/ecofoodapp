const foodData = require("../src/foodData");

const fs = require("fs");

fs.writeFileSync("./verify/temp/foodData.json", JSON.stringify(foodData));
