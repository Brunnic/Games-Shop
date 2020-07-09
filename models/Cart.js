const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    imgs: [
        {
            type: String,
            required: true
        }
    ],
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

});

module.exports = mongoose.model("Cart", cartSchema);