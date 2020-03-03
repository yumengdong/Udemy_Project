var express = require('express');
var router = express.Router({mergeParams: true});
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middleware = require('../middleware');



// Comment New 
router.get('/new',middleware.isLoggedIn, function(req, res){
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
router.post('/',middleware.isLoggedIn, function(req, res){
    //look up using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect('/campgrounds');
        } else{
            // console.log(req.body.comment);
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash('error', 'Something went wrong');
                    console.log(err);
                } else{
                    // console.log(req.body.comment)
                    //add username and id
                    comment.author.id = req.user._id; 
                    comment.author.username = req.user.username; 
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash('success', 'Successfully added comment');
                    res.redirect('/campgrounds/' + campground._id);
                }
            })
        }
    })
});

//edit comment
router.get('/:comment_id/edit', middleware.checkCommentOwner, function(req, res){    
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect('back');
        } else{
            res.render('comments/edit.ejs', {campground_id: req.params.id, comment: foundComment});
        }
    })
})

//submit comment
router.put('/:comment_id', middleware.checkCommentOwner, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect('back')
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    })
});

// comment destroy route
router.delete('/:comment_id', middleware.checkCommentOwner, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect('back');
        } else{
            req.flash('success', 'Comment deleted');
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

// // middleware
// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         console.log('logged in!');
//         return next();
//     }
//     console.log(req.isAuthenticated());
//     res.redirect('/login');
// }

// function checkCommentOwner(req, res, next){
//     if(req.isAuthenticated()){
//         Comment.findById(req.params.comment_id, function(err, foundComment){
//             if(err){
//                 res.redirect('back')
//             } else{
//                  //does the user own that  
//                 if(foundComment.author.id.equals(req.user._id)){  
//                     next();
//                 } else {
//                     console.log('you do not have permission');
//                     res.redirect("back");
//                 }
//             }
//         });
//     } else{
//         res.redirect("back");
//     }
// }

module.exports = router;
