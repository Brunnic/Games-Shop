const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    cart: [
        {
            title: String,
            imgs: [ { type: String} ],
            price: Number,
            quantity: Number
        }
    ],

    role: {
        type: String,
        enum: ["client", "moderator", "admin"],
        default: "client"
    },
    
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);