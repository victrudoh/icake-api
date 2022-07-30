// Dependencies
const mongoose = require("mongoose");

// Stuff
const Schema = mongoose.Schema;

// Cart Schema
const cartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    cakeId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Cake",
    },
    price: {
      type: Number,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
    },
    text: {
      type: String,
    },
    qty: {
      type: Number,
      default: 1,
    },
    // status: {
    //   type: String,
    //   required: true,
    //   default: "pending",
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", cartSchema);
