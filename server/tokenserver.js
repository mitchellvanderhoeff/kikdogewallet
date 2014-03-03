/**
 * Created by mitch on 2/11/2014.
 */

var Crypto = require('cryptojs').Crypto;
var Tokens = require('./db').collection('tokens');
var Unirest = require('unirest');

module.exports = {
   generateToken: function (username, callback) {
      var token = Crypto.util.bytesToBase64(Crypto.util.randomBytes(16));
      Tokens.upsert({
         username: username
      }, {
         username: username,
         token: token
      }, function (error, success) {
         if (error || !success) {
            callback(error, null);
         } else {
            callback(null, token);
         }
      });
   },
   verifyToken: function (username, signedToken, host, callback) {
      Unirest
         .post('https://auth.kik.com/verification/v1/check')
         .send(signedToken)
         .query({
            "u": username,
            "d": host
         })
         .end(function (authResponse) {
            Tokens.findOne({
               username: username
            }, {
               token: 1
            }, function (error, tokenEntry) {
               if (process.env.DEBUG) {
                  console.log("Debug mode, bypassing auth");
                  callback(true);
                  return;
               }
               var tokenValid = (authResponse.ok && authResponse.body == tokenEntry.token && !error && tokenEntry);
               callback(tokenValid);
            });
         });
   }
};