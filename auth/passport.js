var TwitterStrategy = require('passport-twitter').Strategy;
var configAuth = require('./auth');

module.exports = function (passport, db) {
    passport.serializeUser(function(user, done) {
        done(null, user.twitter.id);
    });
	
	passport.deserializeUser(function (id, done) {
        db.collection('users').find({ "id": id }, function(err, user) {
            done(err, user);
        });
	});

	passport.use(new TwitterStrategy({
		consumerKey: configAuth.twitterAuth.clientID,
		consumerSecret: configAuth.twitterAuth.clientSecret,
		callbackURL: configAuth.twitterAuth.callbackURL
	},
    function(token, tokenSecret, profile, done) {

            db.collection('users').findOne({ 'twitter.id' : profile.id }, function(err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user, create them
				    console.log("Trying to add user");
				    var twitterObj = {
				        'id': profile.id,
				        'username': profile.username,
				        'displayName': profile.displayName,
				        'token': token
				    };
				    db.collection('users').insert({ 
				        'twitter': twitterObj
				    });
                    return done(null, { twitter: twitterObj });
				}
			});
	}));
};
