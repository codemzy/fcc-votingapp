var express = require('express');
var app = express();
var mongo = require('mongodb').MongoClient;
var routes = require('./routes/index.js');

app.set('port', (process.env.PORT || 8080));

app.use(express.static('public'));

mongo.connect('mongodb://localhost:27017/votegoat', function (error, db) {
    if (error) {
    throw new Error('Database failed to connect!');
    } else {
    console.log('MongoDB successfully connected on port 27017.');
    }

    // routes
    routes(app, db);
    
    
    app.listen(app.get('port'), function() {
        console.log('Express server listening on port', app.get('port'));
    });
    
});