const mongoose = require("mongoose");
const config = require("config");

const uri = process.env.MongoURI;


module.exports = () => {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => console.log("DB initialised"))
        .catch((err) => console.log(err.message));
}