var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');


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
router.post('/', function(req, res){

    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
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

router.get('/new', function(req, res){
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
})

module.exports = router;
