// Models
const Cake = require("../models/cake.model");
const User = require("../models/user.model");
const Cart = require("../models/cart.model");
const T_Model = require("../models/transaction.model");

// Middlewares
const asyncHandler = require("../middlewares/asyncHandler");
const tx_ref = require("../middlewares/tx_ref");

// Services
const FLW_Services = require("../services/flutterwave.services")

module.exports = {
  // Dashboard
  getDashboardController: asyncHandler(async (req, res, next) => {
    // Check for cakes in DB
    const cakes = await Cake.find();

    // If no cake in DB
    if (cakes.length <= 0)
      return res.status(200).send({
        success: true,
        data: {},
        message: "No cakes found",
      });

    // If cakes are found
    return res.status(200).send({
      success: true,
      data: {
        cakes: cakes,
      },
      message: "Fetched cakes successfully",
    });
  }),

  // Profile
  getProfileController: asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ _id: req.user._id });

    return res.status(200).send({
      success: true,
      data: {
        user: user,
      },
      message: "Fetched user successfully",
    });
  }),

  // Add to cart
  postAddToCartController: asyncHandler(async (req, res, next) => {
    const { cakeId, price, size, color, text, qty } = req.body;

    const cake = await Cake.findById({ _id: cakeId });

    // set price based on quantity
    let newPrice = price;
    if (qty) {
      newPrice = 0;
      newPrice = parseInt(price * qty);
    }

    // add to cart
    const item = new Cart({
      userId: req.user._id,
      cakeId: cake,
      price: newPrice,
      size,
      color,
      text,
      qty,
    });
    await item.save();

    res.status(200).send({
      success: true,
      data: {
        item: item,
      },
      message: "Added to cart successfully",
    });
  }),

  // Delete from cart
  deleteFromCartController: asyncHandler(async (req, res, next) => {
    // get Cake Id
    const { id } = req.query;

    // find cake in cart and delete
    const deleteCake = await Cart.findByIdAndDelete({ _id: id });

    return res.status(200).send({
      success: true,
      message: "Item deleted from cart",
    });
  }),

  // Get Checkout
  getCheckoutController: asyncHandler(async (req, res, next) => {
    // Get cart items
    const cart = await Cart.find();

    let totalPrice = 0;

    // Get prices of items
    cart.map((item) => {
      totalPrice += item.price;
      // console.log(item.price)
    });
    return res.status(200).send({
      success: true,
      data: {
        cart: cart,
        totalPrice: totalPrice,
      },
      mesasge: "Fetched cart items",
    });
  }),

  // Post Checkout
  postCheckoutController: asyncHandler(async (req, res, next) => {

    // Get user
    const user = await User.findOne({ _id: req.user._id });

    // Get cart
    const getCart = await Cart.find();
    // Clone it
    const cart = await Object.assign(getCart);
    // Delete old cart
    await Cart.deleteMany();

    // Stuff for flutterwave
    const { totalPrice, phone } = req.body;
    const transREf = await tx_ref.get_Tx_Ref();
    const newAmount = totalPrice + 100;
    const currency = "NGN"

    // flutterwave payload
    const payload = {
      tx_ref: transREf,
      amount: newAmount,
      currency: currency,
      payment_options: "card",
      redirect_url: "#",
      customer: {
        email: user.email,
        phonenumber: phone,
        name: user.username,
      },
      meta: {
        customer_id: user._id,
      },
      customizations: {
        title: "iCake",
        description: "Pay with card",
        logo: "#",
      },
    };

    const transaction = await new T_Model({
      userId: user._id,
      tx_ref: transREf,
      amount: newAmount,
      cart,
      status: "initiated",
    });
    await transaction.save();

    const response = await FLW_Services.initiateTransaction(payload);

    return res.status(200).send({
      success: true,
      data: {
        response,
      },
      message: "Proceed to payment"
    });
  }),

  // Get Verify Payment
  getVerifyPaymentController: asyncHandler(
      async (req, res, next) => {
          const id = req.query.transaction_id;
          
          const status = req.query.status;
          if (status != "successful") res.status(403).send("Transaction not successful");

          const verify = await FLW_Services.verifyTransaction(id);

        //   Get transaction reference and run it through Transaction model to get transaction record
          const tx_ref = verify.data.tx_ref;
          const transaction = await T_Model.findOne({ tx_ref: tx_ref });
          transaction.status = status;
          await transaction.save();

          res.status(200).send({
            success: true,
            message: verify.message,
            data: {
              verify: verify,
              transaction: transaction,
            },
          });
      }
  ),

  // Get Orders
  getOrdersControllers: asyncHandler(
      async (req, res, next) => {

        // get Transactions
        const trans = await T_Model.find();

        res.status(200).send({
            success: true,
            data: {
                transactions: trans,
            },
            message: "Fetched transactions successfully"
        });
      }
  ),

  // Generate receipt
  getReceiptController: asyncHandler(
      async (req, res, next) => {
          
        //Get order Id
        const { id } = req.query;
        // scan for transaction
        const transaction = await T_Model.findById({ _id : id });

        res.status(200).send({
            success: true,
            data: {
                transaction: transaction,
            },
            message: "Transaction found"
        });
      }
  ),
};
