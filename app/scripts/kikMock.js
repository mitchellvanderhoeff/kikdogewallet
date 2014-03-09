/**
 * Created by mitch on 2/11/2014.
 */
var username = 'eltestador';

if (!(window.kik && window.kik.enabled)) {
   window.kik = {
      getUser: function (callback) {
         callback({
            fullName: 'El Testador',
            firstName: 'El',
            lastName: 'Testador',
            username: username
         })
      },
      sign: function (data, callback) {
         callback(data, username);
      },
      pickUsers: function (options, callback) {
         callback([
            {
               fullName: 'Shibes McDoge',
               firstName: 'Shibes',
               lastName: 'McDoge',
               username: 'wowmuchusername'
            }
         ])
      },
      send: function (to, data) {
         if (!data) {
            data = to;
            to = null;
         }
         console.log("Fake send Kik message to '" + to + "': " + JSON.stringify(data));
      },
      open: function (url) {
         console.log("Fake open URL: " + url);
      },
      photo: {
         get: function (options, callback) {
            callback(['http://i.imgur.com/caCfegC.png']);
         }
      }
   };
   console.log('Mock kik loaded!');
}