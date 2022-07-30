// Dependencies
const bcrypt = require("bcryptjs");

// Models
const Rider = require("../models/rider.model");

// Middlewares
const { uploadImageSingle } = require("../middlewares/cloudinary.js");
const asyncHandler = require("../middlewares/asyncHandler");

// Services
const sendMail = require("../services/mailer.services");

module.exports = {
    getRiderAccessFromMailController: asyncHandler(async (req, res, next) => {
        const { email } = req.query;

        const rider = await Rider.findOne({ email : email });
        if (!rider) return res.status(400).send("Rider not found");

        return res.status(200).send({
            success: true,
            data: {
                rider : rider,
            },
            message: "Rider logged in successfully",
        });
    }),
}
