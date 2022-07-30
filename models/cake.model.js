// Dependencies
const mongoose = require("mongoose");

// Stuff
const Schema = mongoose.Schema;


// Cake Schema
const cakeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    media: {
      type: String,
      required: true,
    },
    customizable: {
      type: Boolean,
      required: true,
    },
    size: {
      type: {
        sm: {
          inches: { type: Number },
          price: { type: Number },
        },
        md: {
          inches: { type: Number },
          price: { type: Number },
        },
        lg: {
          inches: { type: Number },
          price: { type: Number },
        },
      },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cake", cakeSchema);