//External Imports
const DeviceDetector = require("node-device-detector");
const request = require("request");
const db = require("../../db");

exports.detail = async (req, res) => {
  try {
    let ip =
      (req.headers["x-forwarded-for"] || "").split(",").pop().trim() ||
      req.connection.remoteAddress;
    let detector = new DeviceDetector();
    let os = detector.detect(req.headers["user-agent"]);

    let data = {
      ip: ip,
      device_id: os.device ? os.device.id : "",
      brand: os.device ? os.device.brand : "",
      os: os.os ? os.os.name : "",
      os_version: os.os ? os.os.version : "",
      model: os.device ? os.device.model : "",
      type: os.device ? os.device.type : "",
      browser: os.client ? os.client.name : "",
      browser_version: os.client ? os.client.version : "",
    };

    let URL = `http://ip-api.com/json/${ip}`;

    request(
      {
        uri: URL,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
      async (error, response, body) => {
        if (error) {
          //Error INTERNAL SERVER ERROR
          console.log(error);

          data["other_detail"] = {};
        }

        body = JSON.parse(body);

        data["other_detail"] = body;

        await db.User.create({ ...data });

        //Success response
        res.status(200).json({
          error: false,
          code: 200,
          message: "OK",
          data: data,
          result: req.headers["user-agent"]
        });
      }
    );
  } catch (error) {
    //Error INTERNAL SERVER ERROR
    console.log(error);
    //
    res.status(500).json({
      error: true,
      code: 500,
      message: "INTERNAL_SERVER_ERROR",
    });
  }
};
