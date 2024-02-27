const express = require("express");
const routes = express.Router();
const userController = require("../controller/userController");
const jwt_authentication = require("../Middleware/authorization");

routes.post("/signup", userController.signup);
routes.post("/signin/login", userController.signin);
// routes.get("/logout", userController);
routes.post("/getAllUser", jwt_authentication, userController.getAllUser);
routes.get("/test", userController.test);

module.exports = routes;
