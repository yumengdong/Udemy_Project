var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var middleware = require('../middleware');


router.get('/', function(req, res){
    // get all campgrounds from db
    Campground.find({}, function(err, allCamp){
        if(err){
            console.log(err);
        } else{
            // console.log(allCamp)
            res.render('campgrounds/index.ejs', {campgrounds: allCamp, currentUser: req.user});
        }
    })
    //v1 res.render('campgrounds.ejs', {campgrounds: campgrounds});
})

//Submit button in /new direct the page back to here. So use the req.body here
router.post('/', middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, price: price, image: image, description: desc, author: author};

    Campground.create(newCampground, function(err, newCamp){
        if(err){
            console.log(err);
        } else{
            console.log(newCamp)
            res.redirect('/campgrounds') 
        }
    })
    // // v1 campgrounds.push(newCampground);
    // res.send('You hit the post route')
    // res.redirect("/campgrounds")
})

router.get('/new', middleware.isLoggedIn, function(req, res){
    res.render('campgrounds/new.ejs')
})

//add pattern. Show more info about one campground
router.get('/:id', function(req, res){
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            // console.log(foundCampground);
            res.render('campgrounds/show.ejs', {campground: foundCampground});
        }
    })
});

// Edit campground route
router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req, res){
    //is user logged in?
        Campground.findById(req.params.id, function(err, foundCampground){
            res.render('campgrounds/edit.ejs', {campground: foundCampground});            
        });
});
//Update campground route
router.put('/:id', middleware.checkCampgroundOwnership, function(req, res){
    //find and update
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect('/campgrounds')
        } else{
            res.redirect('/campgrounds/' + req.params.id);
        }
    })
    //redirect
})

router.delete('/:id', middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/campgrounds');
        } else{
            res.redirect('/campgrounds');
        }
    })
})



// // middleware
// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         console.log('logged in!');
//         return next();
//     }
//     console.log(req.isAuthenticated());
//     res.redirect('/login');
// };

// function checkCampgroundOwnership(req, res, next){
//     if(req.isAuthenticated()){
//         Campground.findById(req.params.id, function(err, foundCampground){
//             if(err){
//                 res.redirect('back')
//             } else{
//                  //does the user own that  
//                 if(foundCampground.author.id.equals(req.user._id)){
//                     // res.render('campgrounds/edit.ejs', {campground: foundCampground});            
//                     next();
//                 } else {
//                     console.log('you do not have permission');
//                     res.redirect("back");
//                 }
//             }
//         });
//     } else{
//         res.send("need to log in");
//     }
// }

module.exports = router;
