var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
        if(req.isAuthenticated()){
            Campground.findById(req.params.id, function(err, foundCampground){
                if(err){
                 req.flash('error', 'Winery not found!');
                    res.redirect('back')
                } else{
                     //does the user own that  
                    if(foundCampground.author.id.equals(req.user._id)){
                        // res.render('campgrounds/edit.ejs', {campground: foundCampground});            
                        next();
                    } else {
                        req.flash('error', 'You do not have permission');
                        res.redirect("back");
                    }
                }
            });
        } else{
            req.flash('error', 'You need to login!');
            res.send("need to log in");
        }
    }

middlewareObj.checkCommentOwner = function (req, res, next){
        if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id, function(err, foundComment){
                if(err){
                    res.redirect('back')
                } else{
                     //does the user own that  
                    if(foundComment.author.id.equals(req.user._id)){  
                        next();
                    } else {
                        req.flash('error', 'You do not have permission');
                        res.redirect("back");
                    }
                }
            });
        } else{
            req.flash('error', 'You need to login!');
            res.redirect("back");
        }
    }

middlewareObj.isLoggedIn = function(req, res, next){
        if(req.isAuthenticated()){
            console.log('logged in!');
            return next();
        }
        req.flash('error', 'Please login First!');
        res.redirect('/login');
    }

module.exports = middlewareObj;