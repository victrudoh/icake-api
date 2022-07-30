// Dependencies
const mongoose = require("mongoose");

// stuff
const Schema = mongoose.Schema;

// Model
const riderSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    media: {
      type: String,
    },
    phone: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "rider",
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Rider", riderSchema);