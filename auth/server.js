"use strict";
const express = require("express");
const cors = require("cors");
const errorhandler = require("./error-handler/errorHandler");
const notFound = require("./error-handler/404");
const signinRoute = require("./routes/signin");
const signUpRoute = require("./routes/signup");
const secret = require("./routes/secret");
const app = express();
const { user } = require("./models/index");
const bearerAuth = require("./middleware/bearerAuth");

const v1Route = require("./routes/V1");
const v2Route = require("./routes/V2");

app.use(express.json());
app.use(cors());

app.use(signUpRoute);
app.use(signinRoute);
app.use(secret);
app.use("/api/v1", v1Route);
app.use("/api/v2", v2Route);

app.get("/", (req, res) => {
  res.status(200).send("home");
});
app.get("/users", bearerAuth, async (req, res) => {
  const users = await user.findAll();
  res.status(200).json(users);
});

app.use(errorhandler);
app.use("*", notFound);

function start(PORT) {
  app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
  });
}

module.exports = {
  app: app,
  start: start,
};
