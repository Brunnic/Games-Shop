const router = require("express").Router();
const passportConfig = require("../../utils/passport");
const passport = require("passport");

const User = require("../../models/User");

/*
ADRESS /api/cart
METHOD GET
DESC get cart items from cookies if user is not logged in or from database if user is logged
*/

router.get("/cart", async (req, res, next) => {
    // console.log(req.user);
    // console.log(req.cookies["access-token"]);
    if(!req.user && !req.cookies["access-token"]) {
        const cartItems = req.cookies["shopping-cart"] || null;

        if(cartItems == null) {
            res.cookie("shopping-cart", [], { httpOnly: true, sameSite: true });
        }

        return res.json(cartItems);
    }

    else {
        passport.authenticate("jwt", { session: false }, async (err, user, info) => {
            if(err) return res.status(500).json({ error: err });
        
            if(!user) return res.status(400).json({ error: info });
        
            req.logIn(user, (err) => {
              if(err) {
                res.status(500).json({ msg: "Internal Error" });
                throw err;
              }
            });
            try {
                const user = await User.findById(req.user._id);
        
                res.json(user.cart);
            } catch (err) {
                return res.status(500).json({ error: err.message });
            }
          })(req, res, next);

    }
      
});

/*
ADRESS /api/cart/additem
METHOD POST
DESC add items to cart
*/

router.post("/cart/additem", async (req, res, next) => {
    let cartItems = req.cookies["shopping-cart"] || [];
    const { title, imgs, price, quantity } = req.body;

    if(!req.user && !req.cookies["access-token"]) {

        const item  = cartItems.find((product, i) => {
            return product.title == title;
        });

        if(item !== undefined) {
            item.quantity = quantity;

            
            const filteredCart = cartItems.filter((product) => {
                return product.title !== item.title;
            });


            filteredCart.push(item);
            cartItems = filteredCart;
            res.cookie("shopping-cart", filteredCart, { httpOnly: true, sameSite: true });
        }

        else if(item == undefined) {
            cartItems.push({ title, imgs, price, quantity });

            res.cookie("shopping-cart", cartItems, { httpOnly: true, sameSite: true });
        }

        return res.json(cartItems);
    }

    else {
        passport.authenticate("jwt", { session: false }, async (err, user, info) => {
            if(err) return res.status(500).json({ error: err });
        
            if(!user) return res.status(400).json({ error: info });
        
            req.logIn(user, (err) => {
              if(err) {
                res.status(500).json({ msg: "Internal Error" });
                throw err;
              }
            });
            try {
                const user = await User.findById(req.user._id);

                const item = user.cart.find((product, i) => {
                    return product.title == title;
                });

                console.log(item);

                if(item !== undefined) {
                    item.quantity = quantity;
        
                    
                    const filteredCart = user.cart.filter((product) => {
                        return product.title !== item.title;
                    });
        
                    console.log(filteredCart);
        
                    filteredCart.push(item);
                    user.cart = filteredCart;
                }

                else if(item == undefined) {
                    user.cart.push({ title, imgs, price, quantity });
                }

                user.save();

                res.json(user.cart);

            } catch (err) {
                return res.status(500).json({ error: err.message });
            }
        })(req, res, next);
    }

});

/*
ADRESS /api/cart/clear
METHOD DELETE
DESC clear cart
*/

router.delete("/cart/clear", async (req, res) => {
    res.cookie("shopping-cart", [], { httpOnly: true, sameSite: true });

    res.json({ msg: "Cleared Cart" });
});

/*
ADRESS /api/cart/remove/:title
METHOD DELETE
DESC remove product from cart
*/

router.delete("/cart/remove/:title", async (req, res) => {
    
    try {
        const title = req.params.title;

        const cart = req.cookies["shopping-cart"];

        const items = cart.filter((product) => {
            return product.title === title;
        });

        res.cookie("shopping-cart", items, { httpOnly: true, sameSite: true });

        res.json(items)
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }


});




module.exports = router;