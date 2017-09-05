var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");
var keys = require("./keys.js");

var command = process.argv[2];
// var spotify = new Spotify({
//     id: keys.spotifyKeys.clientId,
//     secret: keys.spotifyKeys.clientSecret
// })

var prms = '';
for(var x=3;x<process.argv.length;x++) {
    prms += process.argv[x] + ' ';
}

var log = prms === '' ? command : command + ',"' + prms.trim() + '"';
fs.appendFile('./log.txt', '\n' + log , function(err) {
    if(err) {
        return console.log(err);
    }
});

// function showSpotify() {
//     if(prms === '') prms = '"All Star" by Smash Mouth';
//     var queryUrl = "https://api.spotify.com/v1/search?query=" + prms + "&type=track&offset=0&limit=1";

//     request(queryUrl, function(error, response, body) {
//         var x = JSON.parse(body).tracks.items[0];
//         for (var i = 0; i < x.artists.length ; i++) {
//             console.log("Artist(s): " + x.artists[i].name);
//         }
//         console.log("Name: " + x.name);
//         console.log("Preview link: " + x.preview_url);
//         console.log("Album: " + x.album.name);
//     });
// }

//showSpotify();

function twospotify(){
            //Default song if none provided
           if (prms === '') prms = 'Reforget Lauv';
            var spotify = new Spotify({
                id: keys.spotifyKeys.clientId,
                secret: keys.spotifyKeys.clientSecret
              });
              
        //API call
        spotify.search({
            type: 'track',
            query: prms,
            limit: 5
        }, function (err, data) {
            if (err) {
                // API call failed...
                console.log('Error occurred: ' + err);
            } else {
                var info = data.tracks.items[0];
                console.log("Artist: " + info.artists[0].name +
                    "\nTrack: " + info.name +
                    "\nAlbum: " + info.album.name);
                fs.appendFile('./log.txt', '\n' + "------" +
                "\nArtist: " + info.artists[0].name +
                "\nTrack: " + info.name +
                "\nAlbum: " + info.album.name);
            }
        })
    };
    twospotify();