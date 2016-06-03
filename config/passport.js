/**
 * Created by tejas.siripurapu on 6/2/16.
 */
// Load all dependencies
var LocalStrategy  = require('passport-local').Strategy;
// Load models
var User = require('../app/models/user');
// Export to app
module.exports = function(passport) {
    // Serialize/deserialize user
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    // Add local signup strategy
    passport.use('local-signup', new LocalStrategy({
        // By default uses username and password, use email instead
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // Passes the request to a callback
    },
    function(req, email, password, done) {
        // next tick makes process asynchronous so won't find user
        // until data is fired back
        process.nextTick(function() {
            // check to see if there is an email match
            User.findOne({'local.email' : email}, function(err, user) {
                // return errors
                if(err) {
                    return done(err);
                }
                // if email already exists
                if(user) {
                    return done(null, false, req.flash('signupMessage', 'That email is already taken'));
                }
                // if no email exists, create new user
                else {
                    var newUser = new User();
                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password);
                    // save the user
                    newUser.save(function(err) {
                        if(err) {
                            throw err;
                        }
                        return done(null, newUser);
                    });
                }
            });
        });
    }));
};