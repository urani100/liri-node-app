//require 
require('dotenv').config();

var axios = require("axios");
var Spotify = require('node-spotify-api');
var fs = require('fs');
var keys = require('./keys.js');

//global variable
var spotify = new Spotify(keys.spotify);
var order = process.argv[2];
var input = process.argv[3]; // add quotes



//spotify function
var song = function(){
    
      spotify
      .search({ type: 'track', query: input })
      .then(function(response){
        // console.log(response.tracks);
         console.log
         (
              "Artist(s): " + response.tracks.items[0].artists[0].name+
              "\nThe song's name: " + response.tracks.items[1].name +
              "\nSpotify Link:" + response.tracks.items[0].artists[0].external_urls.spotify + 
              "\nAlbum: " + response.tracks.items[0].name
        );
    })
    .catch(function(err) {
        console.log(err);
    });
}


//concert function
var concert = function(){
    axios.get(`https://rest.bandsintown.com/artists/${input}/events?app_id=codingbootcamp`).then(
    function(response) {
        console.log
            (
            'Location: ' + response.data[0].venue.city + ', ' + response.data[0].venue.country +
            '\nVenue: ' + response.data[0].venue.name + 
            '\nConcert Date: ' +response.data[0].datetime
            );
    },

    function(error) {
        if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
        } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        }
        console.log(error.config);
    }
    );
}

//movie function
var movie = function(){       
    axios.get(`https://www.omdbapi.com/?t=${input}&y=&plot=short&apikey=trilogy`).then(
    function(response) {
        console.log
            (
            'Title: ' + response.data.Title+ 
            '\nYear: ' + response.data.Year+
            '\nIMDB Rating: ' + response.data.Ratings[0].Value+
            '\nRotten Tomatoes Rating: ' + response.data.Ratings[1].Value+
            '\nCountry: ' + response.data.Country+
            '\nOriginal Language: ' + response.data.Language+
            '\nActors: ' + response.data.Actors+
            '\nMovie Plot: ' + response.data.Plot
            );
    },

    function(error) {
        if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
        } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        }
        console.log(error.config);
    }
    );
}

/////////////////////////////////////////////////////////

//place in app.js

if(order ==='spotify-this-song'){
    song();
}else if(order ==='concert-this'){
    concert();
}else if(order ==='do-what-it-says'){
    movie();
}
else{
     console.log('I do not unsdertand your request. Please try again');
}


