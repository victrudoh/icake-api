//  Dependencies
const mongoose = require("mongoose");

// Stuff
const Schema = mongoose.Schema;

// Model
const DeliverySchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        transactionId: {
            type: Schema.Types.ObjectId,
            ref: "Transaction",
            required: true,
        },
        riderId: {
            type: Schema.Types.ObjectId,
            ref: "Rider",
        },
        readyForPickup: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            default: "pending",
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Delivery", DeliverySchema);