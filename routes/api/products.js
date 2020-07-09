const express = require("express");
const router = express.Router();
const passportConfig = require("../../utils/passport");
const passport = require("passport");
const { check, validationResult } = require("express-validator"); 

const Product = require("../../models/Product");

/*
PATH /api/product/add
METHOD POST
DESC Add a new product
*/

router.post("/product/add", [
    check("title", "title is missing").notEmpty(),
    check("info", "info is missing").notEmpty(),
    check("inStock", "should be a boolean").notEmpty(),
    check("imgs", "should be an array of images").isArray().notEmpty(),
    check("price", "Price is missing").notEmpty()
],passport.authenticate("jwt", { session: false }) ,(req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    if(req.user.role === "client") {
        return res.status(401).json({ error: "Unauthorized, please refer to administrator"})
    }

    var { title, info, inStock, imgs, price} = req.body;

    const newProd = Product({
        title,
        info,
        inStock,
        imgs,
        price
    });

    newProd.save()
        .then((prod) => res.json(prod))
        .catch((err) => {
            console.log(err);
            return res.status(500).json({ error: err });
        });
});

/*
PATH /api/product/get/:id
METHOD GET
DESC get one product
*/

router.get("/product/get/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const product = await Product.findById(id);

        res.json(product);

    } catch (err) {
        if(err.kind === "ObjectId") {
            return res.status(404).json({ error: "Product does not exist" });
        }
        return res.status(500).json({ error: err.message });
    }
});

/*
PATH /api/product/getall
METHOD GET
DESC Get all products
*/

router.get("/product/getall", async (req, res) => {
    
    try {
        const products = await Product.find();

        res.json(products);
    } catch (err) {
        console.log(err);
        return res.json({ error: err });
    }
});

/*
PATH /api/product/delete/:id
METHOD DELETE
DESC Delete a product
*/

router.delete("/product/delete/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const id = req.params.id;

    if(req.user.role != "admin" || req.user.role != "moderator") {
        return res.status(401).json({ error: "Unauthorized, please refer to administrator"})
    }

    try {
        const product = await Product.findByIdAndDelete(id);

        res.json({ msg: "Product is deleted!" });

    } catch (err) {
        if(err.kind === "ObjectId") {
            return res.status(404).json({ error: "Product does not exist" });
        }
        return res.status(500).json({ error: err.message });
    }
});


module.exports = router;