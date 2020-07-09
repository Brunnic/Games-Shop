const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    info: {
        desc: {
            type: String,
            required: true,
        },
        config: {
            type: String,
            rquired: true,
        }
    },
    imgs: [
        {
            type: String,
            required: true
        }
    ],
    inStock: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    meta: {
        userRatings: Number
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Product", productSchema);