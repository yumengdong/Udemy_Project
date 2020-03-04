var express = require('express');
var router = express.Router();
var passport = require('passport'),
    User = require('../models/user');

// root route
router.get('/', function(req, res){
    res.render('landing.ejs')

})


// ====
// AUTH ROUTES
// ====

//show register form
router.get('/register', function(req, res){
    res.render('register.ejs');
});
router.post('/register', function(req, res){
    // res.send('Register Post Route');
    // req.body.username;
    // req.body.password;
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            req.flash('error', err.message);
            return res.redirect('/register');
        }
        passport.authenticate('local')(req, res, function(){
            req.flash('success', 'Welcome to Napa Wineries ' + user.username);
            res.redirect('/campgrounds');
         })
    })
})

//show login form
router.get('/login', function(req, res){
    res.render('login.ejs')
});

//handling login
router.post('/login', passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
}), function(req,res){
}); 

// logout route
router.get('/logout', function(req, res){
    req.logout();
    req.flash('success', 'Logged you out!');
    res.redirect('/campgrounds');
})

// //middleware
// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         console.log('logged in!');
//         return next();
//     }
//     console.log(req.isAuthenticated());
//     res.redirect('/login');
// };

module.exports = router;

