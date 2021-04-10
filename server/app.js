/**
 * Application main file
 */
//Internal Imports
const http = require("http");

//External Imports
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
let server = http.createServer(app);


app.use(bodyParser.urlencoded({ extended: false, limit: "100mb" }));
app.use(bodyParser.json({ limit: "100mb" }));

require("./routes")(app);


app.get("/", (req, res) => {
  res.send(`Api is running`);

  res.end();
});

app.set("port", process.env.PORT || 4000);

server.listen(app.get("port"), () => {
  console.info(
    `Api running on PORT: ${app.get("port")} and PID: ${process.pid}`
  );
});

module.exports = app;
