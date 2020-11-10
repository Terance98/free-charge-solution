const PORT = 3000;
const fileUpload = require("express-fileupload");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const routes = require("./routes/router");

app.use(bodyParser.json());
app.use(fileUpload());
app.use(routes);

app.listen(PORT, console.log(`App listening on port ${PORT}`));
