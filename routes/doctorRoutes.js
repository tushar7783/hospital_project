const express = require("express");
const routes = express.Router();
const doctorController = require("../controller/doctorController");
const jwt_authentication = require("../Middleware/authorization");

routes.post("/signup", doctorController.signup);
routes.post("/signin", doctorController.signin);
routes.get("/getAllDoc", jwt_authentication, doctorController.getAllDoctor);
routes.post(
  "/appointmentList",
  jwt_authentication,
  doctorController.appointmentList
);
routes.get("/test", doctorController.test);

module.exports = routes;
