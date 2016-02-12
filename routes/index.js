// var ClickHandler = require(process.cwd() + '/app/controllers/clickHandler.server.js');

module.exports = function (app, db, passport) {
    
	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/');
		}
	}
    
    app.route('/')
        .get(function (request, response) {
    		if (request.isAuthenticated()) {
    			response.sendFile(process.cwd() + '/public/app/loggedin.html');
    		} else {
    			response.sendFile(process.cwd() + '/public/app/index.html');
    		}
            
        });
        
    // anonomous api's
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
            db.collection('polls').findOne({"poll_id": pollID}, {"_id": 0, "title": 1, "poll_id": 1, "options": 1}, function(err, doc) {
                if (err) {
                    res.json({ "error": "No poll found" });
                } else {
                    // respond with poll information including options
                    res.json(doc);
                }
            });
        });
        
    // registered apis
    app.route('/api/user')
        .get(isLoggedIn, function(req, res) {
			res.json(req.user);
        });
        
        
    // authentication routes
        
	app.route('/auth/twitter')
		.get(passport.authenticate('twitter'));

	app.route('/auth/twitter/callback')
		.get(passport.authenticate('twitter', {
			successRedirect: '/',
			failureRedirect: '/'
		}));
		
	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/');
		});
		
};