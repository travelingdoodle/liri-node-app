var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");
var keys = require("./keys.js");
var rp = require('request-promise');

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
    //twospotify();
function moviefunction(){
            //Default movie if none selected
            if (prms === '') prms = 'Mr. Nobody';
            
                    //Parameters for API call
                    let options = {
                        uri: 'https://www.omdbapi.com?apikey=' + keys.omdbKeys.consumer_key + '&t=' + prms,
                        json: true // Automatically parses the JSON string in the response
                    };
            
                    //Call API using request-promise
                    rp(options)
                        .then(function (response) {
                            console.log('Title: ' + response.Title +
                                '\nYear: ' + response.Year +
                                '\nIMDB Rating: ' + response.Ratings[0].Value +
                                '\nRotten Tomatoes Rating: ' + response.Ratings[1].Value +
                                '\nCountry(s): ' + response.Country +
                                '\nLanguage(s): ' + response.Language +
                                '\nPlot: ' + response.Plot +
                                '\nActors: ' + response.Actors);
                                fs.appendFile('./log.txt', '\n---------' + 
                                '\nTitle: ' + response.Title +
                                '\nYear: ' + response.Year +
                                '\nIMDB Rating: ' + response.Ratings[0].Value +
                                '\nRotten Tomatoes Rating: ' + response.Ratings[1].Value +
                                '\nCountry(s): ' + response.Country +
                                '\nLanguage(s): ' + response.Language +
                                '\nPlot: ' + response.Plot +
                                '\nActors: ' + response.Actors)
                        })
                        .catch(function (err) {
                            // API call failed...
                            console.log('There was an error: ' + err);
                        });
                    };
                    moviefunction();