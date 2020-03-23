var express = require('express');
var mongoose = require('mongoose');

var app = express();
var bodyParser = require('body-parser');
var Campground = require('./models/campground');
var Comment = require('./models/comment');
var seedDB = require('./seeds'), 
    LocalStrategy = require('passport-local'),
    User = require('./models/user'),
    methodOverride = require('method-override'),
    flash = require('connect-flash'),
    passport = require('passport');


//requiring routes
var commentRoutes = require('./routes/comments'),
    campgroundRoutes = require('./routes/campgrounds'),
    indexRoutes = require('./routes/index');


// seedDB(); // it will remove everything in database

app.use(flash());
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

app.use(methodOverride("_method")); 


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

// console.log(process.env.DATABASEULR);
// mongoose.connect('mongodb://localhost/napa_wine'); disable since using MongoDB Atlas

var url = process.env.DATABASEULR || "mongodb://localhost/napa_wine"
mongoose.connect(url);

// mongoose.connect('mongodb+srv://dongyumeng88:password123321@cluster0-p6ynm.mongodb.net/yelp_camp?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log('Connected to DB!');
// }).catch(err => {
//     console.log('ERROR:', err.message);
// });

// mongoose.connect('mongodb+srv://dongyumeng88:udemyweb123@cluster0-uhi3c.mongodb.net/test?retryWrites=true', {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log('Connected to DB!');
// }).catch(err => {
//     console.log('ERROR:', err.message);
// });

app.use(express.static(__dirname + '/public'))

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
})


// Campground.create({
//     name: 'Granite Hill',
//     image: "https://i.pinimg.com/564x/6e/85/d1/6e85d184bc7e7ba703be148d4052cbf2.jpg",
//     dehription: "This is a huge granite hill, no bathrooms. No water. Beautiful granite!"
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

// app.listen(3000, function(){
//     console.log('The YelpCamp Server Has Started!')
// })
//
// app.listen(process.env.PORT, process.env.IP,function() {
//     console.log("Server started, listening on port " + process.env.PORT);
// });

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server Has Started!");
});

// app.listen(process.env.PORT, process.env.IP, function(){
//     console.log("The YelpCamp Server Has Started!");
//  });