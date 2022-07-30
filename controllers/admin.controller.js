// Dependencies
const bcrypt = require("bcryptjs");

// Models
const Cake = require("../models/cake.model");
const User = require("../models/user.model");
const T_Model = require("../models/transaction.model");
const Rider = require("../models/rider.model");

// Middlewares
const { uploadImageSingle } = require("../middlewares/cloudinary.js");
const asyncHandler = require("../middlewares/asyncHandler");
const { riderValidation } = require("../middlewares/validate");

// Services
const sendMail = require("../services/mailer.services");

// Templates
const RiderAccessMail = require("../templates/RiderAccessMail.templates");
const zuriMailTask = require("../templates/zuriMailTask.templates");

module.exports = {
  // Add Cake
  postAddCakeController: asyncHandler(async (req, res, next) => {
    const { name } = req.body;

    // Check if cake name exists already
    const cakeExist = await Cake.findOne({ name });
    if (cakeExist)
      return res.status(404).send({
        success: false,
        message: "Cake already exists",
      });

    // send image to cloudinary
    const media = await uploadImageSingle(req, res, next);

    //   save cake
    const cake = new Cake({
      ...req.body,
      media,
    });
    await cake.save();

    return res.status(200).send({
      success: true,
      data: {
        cake: cake,
      },
      message: "Added new cake.",
    });
  }),

  // All Users
  getAllUsersController: asyncHandler(async (req, res, next) => {
    const users = await User.find();

    res.status(200).send({
      success: true,
      data: {
        users: users,
      },
      message: "fetched users successfully",
    });
  }),

  //  Get user by Id
  getUserByIdController: asyncHandler(async (req, res, next) => {
    const { id } = req.query;

    const user = await User.findById({ _id: id });
    if (!user) return res.status(400).send("user not found");

    res.status(200).send({
      success: true,
      data: {
        user: user,
      },
      message: "fetched user successfully",
    });
  }),

  // All Orders
  getAllOrdersController: asyncHandler(async (req, res, next) => {
    const orders = await T_Model.find();

    res.status(200).send({
      success: true,
      data: {
        orders: orders,
      },
      message: "fetched orders successfully",
    });
  }),

  // Get Order by Id
  getOrderByIdController: asyncHandler(async (req, res, next) => {
    const { id } = req.query;

    const order = await T_Model.findById({ _id: id });
    if (!order) return res.status(400).send("user not found");

    res.status(200).send({
      success: true,
      data: {
        order: order,
      },
      message: "fetched order successfully",
    });
  }),

  //  Add Rider
  postAddRiderController: asyncHandler(async (req, res, next) => {
    const { firstname, surname, email, phone, password } = req.body;

    // Run Hapi/Joi validation
    const { error } = await riderValidation.validateAsync(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Hashed password
    const hashedPassword = await bcrypt.hash(password, 12);

    const rider = new Rider({
      firstname,
      surname,
      email,
      phone,
      password: hashedPassword,
    });
    await rider.save();

    // Send password to rider's email
    const mailOptions = {
      to: rider.email,
      subject: "Profile access mail",
      html: RiderAccessMail(rider.firstname, password, rider.email),
      // html: `Hello ${rider.firstname}, your registration was successful, here is your password; <br/> <b>${password}</b>. <br/> You can log in to change the password at your convenience.`,
    };

    sendMail(mailOptions);

    return res.status(200).send({
      success: true,
      data: {
        rider: rider,
      },
      message: "Rider Registered successfully.",
    });
  }),

  // All Riders
  getAllRidersController: asyncHandler(async (req, res, next) => {
    const riders = await Rider.find();

    res.status(200).send({
      success: true,
      data: {
        riders: riders,
      },
      message: "fetched riders successfully",
    });
  }),

  //  Get rider by Id
  getRiderByIdController: asyncHandler(async (req, res, next) => {
    const { id } = req.query;

    const rider = await Rider.findById({ _id: id });

    res.status(200).send({
      success: true,
      data: {
        rider: rider,
      },
      message: "fetched rider successfully",
    });
  }),
};
