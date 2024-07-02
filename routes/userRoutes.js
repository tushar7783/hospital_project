const express = require("express");
const routes = express.Router();
const userController = require("../controller/userController");
const jwt_authentication = require("../Middleware/authorization");
const RoleCheckAdmin = require("../Middleware/adminOnly");
const RoleCheckUser = require("../Middleware/userOnly");
// const RoleCheckUserAndDoctor = require("../Middleware/doctorAndUser");
routes.post("/signup", userController.signup);
routes.post("/signin/login", userController.signin);
// routes.get("/logout", userController)
routes.post(
  "/getAllUser",
  jwt_authentication,
  RoleCheckAdmin,
  userController.getAllUser
);


routes.post(
  "/search/:key",
  jwt_authentication,
  RoleCheckUser,
  userController.search
);

routes.get("/test", userController.test);
routes.put("/changePassword",userController.changePassword)

// ***********************************************appoinment *******************************************************************
routes.post(
  "/appointment",
  jwt_authentication,
  RoleCheckUser,
  userController.appointment
);

routes.post(
  "/isResolved",
  jwt_authentication,
  RoleCheckUser,
  userController.isResolved
);


module.exports = routes;
