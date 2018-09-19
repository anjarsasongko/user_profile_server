const passport = require('passport');
const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;
const bcrypt = require('bcrypt')
const db = require('./database');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  function (email, pass, cb) {
    db.query("SELECT * FROM users where email ='" + email + "'", (error, result, fields) => {
      if (error) throw error;
      if (result) {
        bcrypt.compare(pass, result[0].password, function (err, res) {
          if (err) throw err;
          if (res) {
            return cb(null, {
              id: result[0].id,
              user_id: result[0].user_id,
              username: result[0].username,
              email: result[0].email,
              verified: true
            }, {
              message: 'Logged In Successfully'
            })
          }
        })
      } else {
        return cb(null, false)
      }
    })
  }
));

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_secret'
},
  function (jwtPayload, cb) {
    return cb(null, {
      jwtPayload
    }, {
        message: 'Logged In Successfully'
      })
  }
));