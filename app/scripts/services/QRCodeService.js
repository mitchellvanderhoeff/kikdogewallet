/**
 * Created by mitch on 2014-03-09.
 */
angular.module('kikDogeWalletApp')
   .service('QRCodeService', ['DogecoinService', function (DogecoinService) {
      this.scanQRCode = function (callback) {
         kik.photo.get({
            quality: 0.7,
            minResults: 1,
            maxResults: 1,
            maxHeight: 300,
            maxWidth: 300
         }, function (photos) {
            if (!photos) {
               callback("Photo getting failed", null);
               return;
            }
            var qrCodeURL = photos[0];
            DogecoinService.request('/scanQRCode', {
               fileurl: qrCodeURL
            }, function (error, qrData) {
               if (error || !qrData) {
                  console.error(error);
                  callback(error, null);
                  return;
               }
               callback(null, qrData);
            })
         });
      }
   }]);