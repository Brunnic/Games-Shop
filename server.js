const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const passport = require("passport");
const path = require("path");

const db = require("./config/db");

const app = express();

// DB
db();

// MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api", require("./routes/api/products"));
app.use("/api", require("./routes/api/auth"));
app.use("/api", require("./routes/api/cart"));

if(process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));