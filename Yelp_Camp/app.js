var express = require('express');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
var Campground = require('./models/campground');
var Comment = require('./models/comment');
var seedDB = require('./seeds'), 
    LocalStrategy = require('passport-local'),
    User = require('./models/user'),
    passport = require('passport');

//requiring routes
var commentRoutes = require('./routes/comments'),
    campgroundRoutes = require('./routes/campgrounds'),
    indexRoutes = require('./routes/index');


//seedDB(); // it will remove everything in database

//passport configuration
app.use(require('express-session')({
    secret: 'once again',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost/yelp_camp');

app.use(express.static(__dirname + '/public'))

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})


// Campground.create({
//     name: 'Granite Hill',
//     image: "https://i.pinimg.com/564x/6e/85/d1/6e85d184bc7e7ba703be148d4052cbf2.jpg",
//     description: "This is a huge granite hill, no bathrooms. No water. Beautiful granite!"
// }, function(err, camground){
//     if(err){
//         console.log(err);
//     } else{
//         console.log(camground);
//     }
// }) 

var campgrounds = [
    {name: 'Sal Creek', image: "https://i.pinimg.com/564x/0a/cf/28/0acf288c862b5dc33be4b169560be0b8.jpg"},
    {name: 'Granite Hill', image: "https://i.pinimg.com/564x/6e/85/d1/6e85d184bc7e7ba703be148d4052cbf2.jpg"},
    {name: 'Mountain Rest', image: "https://i.pinimg.com/564x/99/08/ef/9908ef029eae7668a614897dd4f68ada.jpg"},
    {name: 'Sal Creek', image: "https://i.pinimg.com/564x/0a/cf/28/0acf288c862b5dc33be4b169560be0b8.jpg"},
    {name: 'Granite Hill', image: "https://i.pinimg.com/564x/6e/85/d1/6e85d184bc7e7ba703be148d4052cbf2.jpg"},
    {name: 'Mountain Rest', image: "https://i.pinimg.com/564x/99/08/ef/9908ef029eae7668a614897dd4f68ada.jpg"},
    {name: 'Sal Creek', image: "https://i.pinimg.com/564x/0a/cf/28/0acf288c862b5dc33be4b169560be0b8.jpg"},
    {name: 'Granite Hill', image: "https://i.pinimg.com/564x/6e/85/d1/6e85d184bc7e7ba703be148d4052cbf2.jpg"},
    {name: 'Mountain Rest', image: "https://i.pinimg.com/564x/99/08/ef/9908ef029eae7668a614897dd4f68ada.jpg"}
];

app.use(bodyParser.urlencoded({extended: true}));

app.use('/', indexRoutes);
app.use('/campgrounds',campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

app.listen(3000, function(){
    console.log('The YelpCamp Server Has Started!')
})