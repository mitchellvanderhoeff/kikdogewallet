/**
 * Created by mitch on 2/9/2014.
 */

var Unirest = require('unirest');
var _ = require('underscore');
var keydb = require('./db').collection('apikey');

var API_KEY = null;

function fetchApiKey(callback) {
   keydb.findOne({}, {key: 1}, function (error, entry) {
      if (error || !entry) {
         console.error("Doge API key is not defined. Please define it in the database");
         keydb.insert({
            key: null
         });
         return;
      }
      API_KEY = entry.key;
      callback();
   });
}

function apiRequest(data, callback) {
   if (!API_KEY) {
      fetchApiKey(function () {
         apiRequest(data, callback);
      });
      return;
   }
   var queryData = _.extend({
      api_key: API_KEY
   }, data);

   Unirest
      .get('https://www.dogeapi.com/wow/')
      .query(queryData)
      .end(callback);
}

module.exports = apiRequest;