const jwt = require("jsonwebtoken");
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const csv = require("csvtojson");

function generateAccessToken(user) {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: "86400s" });
}

function verifyAccessToken(token) {
  return jwt.verify(token, ACCESS_TOKEN_SECRET);
}

function groupByMonth(accountDetails) {
  const grouped = {};
  accountDetails.forEach((item) => {
    const month = item && item.date && new Date(item.date).getMonth();
    if (!grouped[month]) grouped[month] = [item];
    else grouped[month].push(item);
  });
  if (grouped[""]) delete grouped[""];
  return grouped;
}

function csvToJson(csvStr) {
  return new Promise((resolve, reject) => {
    csv({
      noheader: true,
      output: "csv",
    })
      .fromString(csvStr)
      .then((csvRow) => {
        csvRow.shift(); //removing the header row
        const formatted = csvRow.map((row) => {
          return {
            date: row[0],
            description: row[1],
            withdraw: row[2],
            deposit: row[3],
            balance: row[4],
          };
        });
        resolve(formatted);
      })
      .catch((err) => reject(err));
  });
}

module.exports = {
  generateAccessToken,
  verifyAccessToken,
  csvToJson,
  groupByMonth,
};
