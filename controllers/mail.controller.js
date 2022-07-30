// Dependencies
const nodemailer = require("nodemailer");

// Middlewares
const asyncHandler = require("../middlewares/asyncHandler");

// Services
const sendMail = require("../services/zuriMail.services");

// Templates
const zuriMailTask = require("../templates/zuriMailTask.templates");

module.exports = {
  sendMailController: asyncHandler(async (req, res, next) => {
    const { firstName, email } = req.query;

    // Send password to user's email
    const mailOptions = {
      to: email,
      subject: "Zuri Mail Task",
      html: zuriMailTask(firstName),
    };

    sendMail(mailOptions);

    return res.status(200).send({
      success: true,
      message: `Mail sent to ${email}`,
    });
  }),
};
