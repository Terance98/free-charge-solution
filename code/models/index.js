const mongoose = require('mongoose');
require('dotenv').config();
const CONNECTION_URL = process.env.MONGODB_CONNECTION_URL;

mongoose.connect(CONNECTION_URL, function (err) {
  if (err) throw err;
});


module.exports = {
    User : require("./user")
}
