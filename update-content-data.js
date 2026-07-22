const fs = require("fs");
const path = require("path");

const root = __dirname;
const outputFile = path.join(root, "content-data.js");
const data = {};
const languageSuffixes = ["", "_de", "_vn"];

for (let day = 1; day <= 40; day += 1) {
  const dayName = `day${String(day).padStart(2, "0")}`;

  languageSuffixes.forEach((suffix) => {
    const fileName = `${dayName}${suffix}.txt`;
    const filePath = path.join(root, fileName);
    data[fileName] = fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
  });
}

const output = `window.PRAYER_TEXTS = ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync(outputFile, output, "utf8");

const filledFiles = Object.values(data).filter((text) => text.trim()).length;
console.log(`Updated content-data.js with ${filledFiles} filled text file(s).`);
