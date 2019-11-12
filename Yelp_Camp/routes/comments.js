var express = require('express');
var router = express.Router({mergeParams: true});
var Campground = require('../models/campground');
var Comment = require('../models/comment');



// Comment New 
router.get('/new',isLoggedIn, function(req, res){
    // res.send('This will be the comment form!');
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else{
            res.render('comments/new.ejs', {campground: campground});
        }
    })
    
})

// Comment Create
router.post('/',isLoggedIn, function(req, res){
    //look up using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect('/campgrounds');
        } else{
            // console.log(req.body.comment);
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else{
                    // console.log(req.body.comment)
                    //add username and id
                    comment.author.id = req.user._id; 
                    comment.author.username = req.user.username; 
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            })
        }
    })
});

// middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        console.log('logged in!');
        return next();
    }
    console.log(req.isAuthenticated());
    res.redirect('/login');
}

module.exports = router;
