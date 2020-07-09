const mongoose = require("mongoose");
const config = require("config");


module.exports = () => {
    mongoose.connect(config.get("db.uri"), { useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => console.log("DB initialised"))
        .catch((err) => console.log(err.message));
}