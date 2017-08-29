

// --------- EXAMPLE SEARCH FUNCTION FROM SPOTIFY --------
// search: function({ type: 'artist OR album OR track', query: 'My search query', limit: 20 }, callback);
var Spotify = require('node-spotify-api');
var spotLink;
var spotify = new Spotify({
 id: '866c82ba1b9b4955b95ab35bdfc76ec2',
 secret: 'd156764673ea477a9125510bc802f35c'
});

spotify.search({ type: 'track', query: 'All the Small Things', limit: 1 }, function(err, data) {
 if (err) {
   return console.log('Error occurred: ' + err);
 }
spotLink = data.tracks.href;
console.log("LINE 17: " + spotLink);
console.log(data); 
});