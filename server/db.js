/**
 * Created by mitch on 2/9/2014.
 */


/*
 * This is where the MongoDB instance is created.
 * The current setup works for the MongoHQ plugin on Heroku as well as running locally.
 * If you wish to run on another server, make the appropriate changes here.
 */
var MongoJS = require('mongojs');

var db;
var mongoHqUrl = process.env.MONGOHQ_URL;
if (mongoHqUrl) {
   db = MongoJS(mongoHqUrl);
   console.log("Connected to DB: " + mongoHqUrl);
} else {
   db = MongoJS('dogewallet');
}

module.exports = db;