/**
 * Created by mitch on 2/9/2014.
 */

var Unirest = require('unirest');
var TokenServer = require('./tokenmanager');

module.exports = function (req, res, next) {
   var signedToken = req.param("signedToken");
   var username = req.param("username");
   var host = req.param("host");
   TokenServer.verifyToken(username, signedToken, host, function (tokenValid) {
      if (tokenValid) {
         next();
      } else {
         res.send(401, "ERROR: Unauthorized Kik account");
      }
   });
};