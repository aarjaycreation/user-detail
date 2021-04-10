//External Imports
const Mongoose = require("mongoose");

//Database url
let uri = "mongodb+srv://Rahul:love91++@cluster0.fhdae.mongodb.net/"//config.get("mongodb.url");
let dbName = "user_detail"//config.get("mongodb.database");

let mongoose = Mongoose.connect(`${uri}${dbName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

module.exports = { mongoose };
