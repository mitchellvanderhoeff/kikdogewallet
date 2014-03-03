/**
 * Created by mitch on 2/9/2014.
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