/**
 * Created by mitch on 2014-03-09.
 */
var Canvas = require('canvas');
var Image = Canvas.Image;
var qrcode = require('jsqrcode')();

module.exports = function (req, res) {
   var fileurl = req.param('fileurl');
   var image = new Image();
   image.onload = function () {
      try {
         var qrData = qrcode.decode(image);
         res.send(qrData);
      } catch (e) {
         console.error('Unable to read QR code: ' + e);
         res.send(500, e);
      }
   };
   image.src = fileurl;
};