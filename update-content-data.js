const fs = require("fs");
const path = require("path");

const root = __dirname;
const outputFile = path.join(root, "content-data.js");
const data = {};

for (let day = 1; day <= 40; day += 1) {
  const fileName = `day${String(day).padStart(2, "0")}.txt`;
  const filePath = path.join(root, fileName);
  data[fileName] = fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

const output = `window.PRAYER_TEXTS = ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync(outputFile, output, "utf8");

const filledDays = Object.values(data).filter((text) => text.trim()).length;
console.log(`Updated content-data.js with ${filledDays} filled day file(s).`);
