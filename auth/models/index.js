"use strict";
require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const collection = require("./collection-class");
const user = require("./userModel");
const food = require("./food");
const clothes = require("./clothes");

const POSTGRES_URL =
  process.env.NODE_ENV === "test" ? "sqlite:memory:" : process.env.DATABASE_URL;

let sequelizeOptions =
  process.env.NODE_ENV === "production"
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {};

let sequelize = new Sequelize(POSTGRES_URL, sequelizeOptions);

let foodc = new collection(food(sequelize, DataTypes));
let clothesc = new collection(clothes(sequelize, DataTypes));

module.exports = {
  db: sequelize,
  user: user(sequelize, DataTypes),
  food: foodc,
  clothes: clothesc,
};
