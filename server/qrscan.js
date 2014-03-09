/**
 * Created by mitch on 2014-03-09.
 */
var Unirest = require('unirest');

module.exports = function (req, res) {
   var fileurl = req.param('fileurl');
   Unirest
      .get('http://api.qrserver.com/v1/read-qr-code/')
      .query({
         fileurl: fileurl
      })
      .end(function (response) {
         if (response.ok) {
            res.send(response.body)
         } else {
            res.send(500, response.body);
         }
      })
};