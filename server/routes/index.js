module.exports = (app) => {
  //
  app.use("/check", require("../api/detail"));
};
