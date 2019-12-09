var express = require('express');
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://dongyumeng88:password123321@cluster0-shard-00-00-p6ynm.mongodb.net:27017,cluster0-shard-00-01-p6ynm.mongodb.net:27017,cluster0-shard-00-02-p6ynm.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to DB!');
}).catch(err => {
    console.log('ERROR:', err.message);
});

const PostSchema = new mongoose.Schema({
    title: String,
    description: String,
});

const Post = mongoose.model('Post', PostSchema);

app.get('/', async (req, res) => {
    let post = await Post.create({title: 'Test', description: 'This is a test also'});
    res.send(post);
});

app.listen(3000, function(){
    console.log('The Server Has Started!')
});


