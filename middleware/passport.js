const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { findUser } = require("../services/user-service")
let jwt = require('jsonwebtoken');
let config = require('./config');

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    },
    (email, password, done) => {
        findUser(email).then((data) => {
            if (data.length == 0) {
                return done(null, false);
            }
            if (bcrypt.compareSync(password, data[0].password)) {
                let token = jwt.sign({
                        username: data[0].email,
                        role: data[0].isAdmin,
                        name: data[0].name
                    },
                    config.secret, {
                        expiresIn: '20m'
                    });
                return done(null, {
                    token: token,
                    user: data[0]
                });
            } else {
                return done(null, false);
            }
        }).catch((error) => done(null, false));

    }));

module.exports = passport;