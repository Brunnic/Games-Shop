const mongoose = require("mongoose");

const uri = process.env.MongoURI;


module.exports = () => {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => console.log("DB initialised"))
        .catch((err) => console.log(err.message));
}