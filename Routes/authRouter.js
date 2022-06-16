const route = require("express").Router();
const authController = require("../Controllers/authController");
const multer = require("../Midlware/uploadImage");

route.post("/register", multer.single("picture"), authController.register);

route.post("/Login", multer.single("photo"), authController.Login);

module.exports = route;
