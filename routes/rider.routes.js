// Dependencies
const path = require("path");
const express = require("express");

// Middlewares
const { multerUploads } = require("../middlewares/multer");
const { authorize } = require("../middlewares/roleCheck");

// controller
const rider = require("../controllers/rider.controller");

// Stuff
const router = express.Router();

// Routes
router.get("/user", rider.getRiderAccessFromMailController);

module.exports = router;
