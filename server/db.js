/**
 * Created by mitch on 2/9/2014.
 */

var Mongolian = require('mongolian');

var db;
var mongoHqUrl = process.env.MONGOHQ_URL;
if (mongoHqUrl) {
   db = new Mongolian(mongoHqUrl);
} else {
   db = new Mongolian().db('dogewallet')
}

module.exports = db;