/**
 * Created by mitch on 2/11/2014.
 */
var username = 'theMizzler';

if (!(window.kik && window.kik.enabled)) {
   window.kik = {
      getUser: function (callback) {
         callback({
            fullName: 'Mizzl Drizzl',
            firstName: 'Mizzl',
            lastName: 'Drizzl',
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
               username: 'jemaiseenma'
            }
         ])
      },
      send: function (to, data) {
         console.log("Fake send Kik message to '" + to + "': " + JSON.stringify(data));
      }
   };
   console.log('Mock kik loaded!');
}