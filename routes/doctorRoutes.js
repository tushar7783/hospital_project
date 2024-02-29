const express = require("express");
const routes = express.Router();
const doctorController = require("../controller/doctorController");
const jwt_authentication = require("../Middleware/authorization");
// const { route } = require("./userRoutes");
const RoleCheckAdmin = require("../Middleware/adminOnly");
const RoleCheckDoctor = require("../Middleware/doctorOnly");
const RoleCheckUser = require("../Middleware/userOnly");

routes.post("/signup", doctorController.signup);
routes.post("/signin", doctorController.signin);
routes.get(
  "/getAllDoc",
  jwt_authentication,
  RoleCheckAdmin,
  doctorController.getAllDoctor
);
routes.post(
  "/appointmentList",
  jwt_authentication,
  RoleCheckDoctor,
  doctorController.appointmentList
);
routes.post(
  "/testAdmin",
  jwt_authentication,
  RoleCheckAdmin,
  doctorController.testAdmin
);

routes.post(
  "/testDoctor",
  jwt_authentication,
  RoleCheckDoctor,
  doctorController.testDoctor
);

routes.post(
  "/testUser",
  jwt_authentication,
  RoleCheckUser,
  doctorController.testUser
);

routes.get("/test", doctorController.test);

module.exports = routes;
