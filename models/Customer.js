const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    email: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    adress1: {
        type: String,
    },
    adress2: {
        type: String,
    },
    country: {
        type: String,
    },
    state: {
        type: String,
    },
    postcode: {
        type: String,
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
    }
    
});

module.exports = mongoose.model("User", userSchema);