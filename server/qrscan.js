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
            var addressData = response.body[0].symbol[0].data;
            res.send(addressData);
         } else {
            res.send(500, response.body);
         }
      })
};