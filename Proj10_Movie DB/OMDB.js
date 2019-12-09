var express = require('express');
var app = express();
var request = require('request');

app.get('/', function(req, res){
    res.render('search.ejs');
});

app.get('/results', function(req, res){
    var query = req.query.search;
    var url = 'http://www.omdbapi.com/?s=' + query + '&apikey=thewdb'
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            // res.send(results['Search'][0]['Title']);
            res.render('results.ejs', {data: data});
        };
    })

});

app.listen(3000, function(){
    console.log('Movie App listening on part 3000')
})



