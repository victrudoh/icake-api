// Dependencies
const express = require("express");
const path = require("path");

// controller
const user = require("../controllers/user.controller");

// Middleware
const { authenticate } = require("../middlewares/authenticateJWT");

// Stuff
const router = express.Router()


// Routes
router.get("/dashboard", user.getDashboardController);
router.get("/profile", authenticate, user.getProfileController);
router.post("/addToCart", authenticate, user.postAddToCartController);
router.get("/checkout", authenticate, user.getCheckoutController);
router.post("/checkout", authenticate, user.postCheckoutController);
router.get("/verify", authenticate, user.getVerifyPaymentController);
router.get("/deleteFromCart", authenticate, user.deleteFromCartController);
router.get("/orders", authenticate, user.getOrdersControllers);
router.get("/receipt", authenticate, user.getReceiptController);


module.exports = router;
