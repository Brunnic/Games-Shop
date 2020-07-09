const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const bcrypt = require("bcryptjs");
const config = require("config");
const passport = require("passport");

const User = require("../models/User");

const cookieExtractor = req => {
    let token = null;
    if(req && req.cookies) {
        token = req.cookies["access-token"];
    }

    return token;
};

passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: config.get("secret")
}, (payload, done) => {
    User.findById(payload.sub)
        .then((user) => {
            if(!user) return done(null, false)

            return done(null, user);
        })
        .catch((err) => {
            return done(err, false);
        });
}));

passport.use(
    new LocalStrategy({usernameField: "email"}, (email, password, done) => {
      // Match User
      User.findOne({ email })
      .then((user) => {
        // User not found
        if(!user) {
          return done(null, false, { message: "Incorrect credentials" });
        }
  
        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if(err) throw err;
  
          if(isMatch){
            return done(null, user);
          } else {
            return done(null, false, { message: "Incorrect credentials"});
          }
        });
  
      }).catch(err => console.log(err));
    })
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id ,done) => {
  User.findById(id, (err, user) => {
    if(err) throw err;
    
    done(null, user);
  })
});