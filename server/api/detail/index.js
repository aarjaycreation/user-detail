//Exernal Imports
const express = require("express");

//Custom Imports
const controller = require("./detail.controller");

const router = express.Router();

router.get("/detail", controller.detail);

module.exports = router;
