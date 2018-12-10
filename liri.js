//require variables
require('dotenv').config();

var axios = require("axios");
var Spotify = require('node-spotify-api');
var fs = require('fs');
var request = require('request');
var moment = require('moment');
var exec = require('child_process').exec, child;
var keys = require('./keys.js');


//global variables
var spotify = new Spotify(keys.spotify);
var command = process.argv[2];
var input = process.argv.slice(3).join(' '); 
var output = '';
var timeStamp = new Date();




//default (The Sign)  spotify-this-song function
var defaultSong = function(){
    spotify
    .request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
    .then(function(data) {
        output =
           '\n' + timeStamp + '\n' + 
            '\nDefault request: ' +
            "\nArtist(s): " +  data.artists[0].name +
            "\nSong's name: " + data.name+ 
            "\nSpotify Link:" + data.artists[0].external_urls.spotify +
            "\nAlbum: " + data.name + '\n------------------------------';
        
        logData(output);
        console.log(output);
    })
    .catch(function(err) {
    console.error('Error occurred: ' + err); 
  });
}


//spotify-this-song function
var song = function(){
      spotify
      .search({ type: 'track', query: input })
      .then(function(response){
            output =
            '\nRequest Made on: ' + timeStamp + '\n' + 
            '\nSpotify Response for: ' + input +
              "\nArtist(s): " + response.tracks.items[0].artists[0].name+
              "\nSong's name: " + response.tracks.items[1].name +
              "\nSpotify Link:" + response.tracks.items[0].artists[0].external_urls.spotify + 
              "\nAlbum: " + response.tracks.items[0].name + '\n------------------------------';

        logData(output);
        console.log(output);
    
    })
    .catch(function(err) {
        console.log(err);
    });
}

//concert-this function 
var concert = function(){
    if(input){
        axios.get(`https://rest.bandsintown.com/artists/${input}/events?app_id=codingbootcamp`).then(
        function(response) {
            if(response.data[0] === undefined){
                console.log
                    (
                    '\nRequest Made on: ' + timeStamp + '\n' + 
                    '\nBands in Town Response for: ' + input +
                    '\n'+ input + ' was not found'
                    )
            }else{
                output=  
                '\nRequest Made on: ' + timeStamp + '\n' + 
                '\nBands in Town Response for: ' + input +
                '\nLocation: ' + response.data[0].venue.city + ', ' + response.data[0].venue.country +
                '\nVenue: ' + response.data[0].venue.name + 
                '\nConcert Date: ' + moment(response.data[0].datetime).format('MM/DD/YYYY')+ '\n------------------------------'
            logData(output);
            console.log(output);
            }  
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
        });
    }else{
        console.log('You forgot to specify the artist name. Please try again.')
    }
}

//movie-this function
var movie = function(){ 
    if(input){
        var link = `https://www.omdbapi.com/?t=${input}&y=&plot=short&apikey=trilogy`
    }else{
        link=`https://www.omdbapi.com/?t=Mr. Nobody&y=&plot=short&apikey=trilogy`
    }
   
    axios.get(link).then(
    function(response) {
            output=
            '\n' + timeStamp + '\n' + 
            '\nOMB Response for: ' + input + 
            '\nTitle: ' + response.data.Title+ 
            '\nYear: ' + response.data.Year+
             '\nIMDB Rating: ' + response.data.Ratings[0].Value+
            '\nRotten Tomatoes Rating: ' + response.data.Ratings[1].Value+
            '\nCountry: ' + response.data.Country+
            '\nOriginal Language: ' + response.data.Language+
            '\nActors: ' + response.data.Actors+
            '\nMovie Plot: ' + response.data.Plot + '\n------------------------------';
            
            logData(output);
            console.log(output);
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

//executeText function 
var executeText = function(){
   fs.readFile('random.txt', 'utf8', function(err, data){
        if(err){
            console.log(err) 
        }
        child = exec(data, function (error, stdout, stderr) {
         console.log(stdout);
         console.log(stderr);
         if (error !== null) {
             console.log('exec error: ' + error);
            } 
        });
    })
}

//updateText function 
var updateText = function(){
    var dictate = fs.writeFile('random.txt', input , function(err){
        if(err){
            console.log('error has occured')
        }else{
            console.log('random.txt has been updated');
        }
    });
}


//logData function 
var logData = function(output){
    fs.appendFile('data.txt', output, function(err){
        if (err){
            consolelog(err)
        }else{
            console.log('The log file, data.txt, has been updated.')
        }
    });
}


// command logic
if(command ==='spotify-this-song'){
    if(input){
         song();
    }else{
        defaultSong();
    } 
}else if(command ==='concert-this'){
    concert();
}else if(command ==='movie-this'){
    movie();
}else if(command ==='do-what-it-says'){
    executeText();
}else if(command ==='updateText'){
    updateText();
}
else{
    console.log('Your Command is not Valid. Please Try Again');    
}

