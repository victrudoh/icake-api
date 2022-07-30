// Dependencies
const path = require("path");
const express = require("express");

// controller
const mail = require("../controllers/mail.controller");

// Stuff
const router = express.Router();

// Routes
router.get("/", mail.sendMailController);

module.exports = router;
