/**
 * Mongo initialization module
 */

//  Internal Imports
const fs = require("fs");
const path = require("path");

//External Imports
const { pascalCase } = require("change-case");
const Mongoose = require("mongoose");

// Initialize mongoose Connection
const { mongoose } = require("./mongo.connection");

// Constants
const MODELS_DIRECTORY_PATH = path.resolve(__dirname, "models");

const importModels = () => {
  //
  const models = {};
  //
  fs.readdirSync(MODELS_DIRECTORY_PATH)
    .filter((file) => file.indexOf(".") !== 0 && file !== "index.js")
    .forEach((file) => {
      //
      // const model = sequelize.import(path.join(MODELS_DIRECTORY_PATH, file));
      const model = require(path.join(MODELS_DIRECTORY_PATH, file))(Mongoose);
      models[pascalCase(model.modelName)] = model;
    });

  return models;
};

// Initialize Mongoose Models
const db = importModels();

db.mongoose = mongoose;
db.Mongoose = Mongoose;

module.exports = db;
