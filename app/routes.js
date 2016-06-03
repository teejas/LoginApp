/**
 * Created by tejas.siripurapu on 6/2/16.
 */
module.exports = function(app, passport) {
    // Home page with login links
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });
    // Show login form
    app.get('/login', function(req, res) {
        // render page and show flash data
        res.render('login.ejs', {message : req.flash("loginMessage")});
    });
    // Process login form
    // app.post('/login', passport stuff here);

    // Show signup form
    app.get('/signup', function(req, res) {
        // render page and pass flash data
        res.render('signup.ejs', {message : req.flash("signupMessage")});
    });
    // Process signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    // Profile section must be protected so you have to authenticate login
    // use isLoggedIn middleware
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {user : req.user});
    });
    // Logout
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};
function isLoggedIn(req, res, next) {
    // if authenticated carry on
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}
