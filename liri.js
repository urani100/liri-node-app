//require 
require('dotenv').config();

var axios = require("axios");
var Spotify = require('node-spotify-api');
var fs = require('fs');
var exec = require('child_process').exec, child;
var keys = require('./keys.js');


//global variables
var spotify = new Spotify(keys.spotify);
var request = process.argv[2];
var input = `"${process.argv[3]}"`; // add quotes




//spotify function
var song = function(){
    
      spotify
      .search({ type: 'track', query: input })
      .then(function(response){
        // console.log(response.tracks);
         console.log
         (
              "\nArtist(s): " + response.tracks.items[0].artists[0].name+
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
            '\nLocation: ' + response.data[0].venue.city + ', ' + response.data[0].venue.country +
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

    //If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

    axios.get(`https://www.omdbapi.com/?t=${input}&y=&plot=short&apikey=trilogy`).then(
    function(response) {
        console.log
            (
            '\nTitle: ' + response.data.Title+ 
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

//function executeText

var executeText = function(){
   fs.readFile('random.txt', 'utf8', function(err, data){
        if(err){
            console.log(err) 
        }
        child = exec( `node liri.js spotify-this-song  ${data}`,function (error, stdout, stderr) {
         console.log('\n' + stdout);
         console.log(stderr);
         if (error !== null) {
             console.log('exec error: ' + error);
            } 
        });
    })
}

var updateText = function(){
    var dictate = fs.writeFile('random.txt', `"${input}"`, function(err){
        if(err){
            console.log('error has occured')
        }else{
            console.log('file has been updated');
            console.log(process.argv)
        }
    });
}

/////////////////////////////////////////////////////////


if(request ==='spotify-this-song'){
    song();
}else if(request ==='concert-this'){
    concert();
}else if(request ==='movie-this'){
    movie();
}else if(request ==='do-what-it-says'){
    executeText();
}else if(request ==='updateText'){
    updateText();
}
else{
    console.log('Your Request is not Valid. Please Try Again');    
}

//node liri.js do-what-it-says "spotify-this-song 'I Want it That Way' "
