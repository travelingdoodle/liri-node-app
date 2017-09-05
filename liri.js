// TWEETSWORK || SPOTIFYWORKS || MOVIES WORK, my guy

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");
var keys = require("./keys.js");
var rp = require('request-promise');

var command = process.argv[2];

var prms = '';
for (var x = 3; x < process.argv.length; x++) {
  prms += process.argv[x] + ' ';
};

var log = prms === '' ? command : command + ',"' + prms.trim() + '"';
fs.appendFile('./log.txt', '\n' + log, function (err) {
  if (err) {
    return console.log(err);
  }
});

firstCall(command);

function firstCall(command) {
  switch (command) {
    case 'my-tweets':
      showTweets();
      break;
    case 'spotify-this-song':
      showSpotify();
      break;
    case 'movie-this':
      showMovie();
      break;
    case 'do-what-it-says':
      fs.readFile('./random.txt', 'utf8', function (err, data) {
        if (err) {
          throw err;
        }
        var temp = data.split(',');
        prms = temp[1];
        firstCall(temp[0]);
      });
      break;
  }
}

function showTweets() {
  var client = new Twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret
  });
  var params = {
    screen_name: 'BrownTinMan',
    count: 2
  };
  client.get('statuses/user_timeline.json', params, function (error, tweets, response) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        //console.log("for loop of tweets is running");
        console.log(tweets[i].text);
        fs.appendFile('./log.txt', '\n' + "tweet" + [i] + " " + tweets[i].text);
      }
    };
  });
}

function showSpotify() {
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
}

function showMovie() {
  if (prms === '') prms = 'Mr. Nobody';
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
}