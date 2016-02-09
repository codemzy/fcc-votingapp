// var ClickHandler = require(process.cwd() + '/app/controllers/clickHandler.server.js');

module.exports = function (app, db) {
    app.route('/')
        .get(function (request, response) {
            response.sendFile(process.cwd() + '/public/app/index.html');
        });
    app.route('/api/polls')
        .get(function(req, res) {
            db.collection('polls').find({}, {"_id": 0, "title": 1, "poll_id": 1}).toArray(function(err, docs) {
                if (err) {
                    res.json({ "error": "There were no polls found" });
                } else {
                    // repond with all poll titles and poll id's
                    res.json(docs);
                }
            });
        });
    app.route('/api/poll/:pollid')
        .get(function(req, res) {
            var pollID = parseInt(req.params.pollid);
            console.log(pollID);
            db.collection('polls').find({"poll_id": pollID}, {"_id": 0, "title": 1, "poll_id": 1, "options": 1}).toArray(function(err, doc) {
                if (err) {
                    res.json({ "error": "No poll found" });
                } else {
                    // respond with poll information including options
                    res.json(doc);
                }
            });
        });

};