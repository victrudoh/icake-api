// Dependencies
const path = require("path");
const express = require("express");

// Middlewares
const { multerUploads } = require("../middlewares/multer");
const { authorize } = require("../middlewares/roleCheck");

// controller
const admin = require("../controllers/admin.controller");

// Stuff
const router = express.Router()

// Routes
router.post("/addCake", multerUploads.single('media'), admin.postAddCakeController);
router.get("/users", admin.getAllUsersController);
router.get("/user", admin.getUserByIdController);
router.get("/orders", admin.getAllOrdersController);
router.get("/order", admin.getOrderByIdController);
router.post("/addRider", admin.postAddRiderController);
router.get("/riders", admin.getAllRidersController);
router.get("/rider", admin.getRiderByIdController);


module.exports = router;