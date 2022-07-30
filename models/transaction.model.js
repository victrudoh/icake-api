const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TransactionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tx_ref: {
      type: String,
      required: true,
      unique: true,
    },
    flw_ref: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    cart: {
      type: Object,
      required: true
    },
    status: {
      type: String,
      required: true,
      defaultValue: "initiated",
    },
  },
  { timestamps: true }
);

TransactionSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  const newObject = {
    ...object,
  };

  return newObject;
});


module.exports = mongoose.model("Transaction", TransactionSchema);
