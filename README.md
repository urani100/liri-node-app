# LIRI APLICACTION

## Author
Marsha Leconte

## Application Overview
 The **LIRI** application is a Language Interpretation and Recognition Interface. The application leverages 
 the open source server environment, **Node**, as well as several Package Managers **(npm)**. **LIRI** also takes advantage of different **API** 
 to provide specific  information. **LIRI** has the capacity to render information about, **concerts, songs and movies**. 
 The Application makes use of four parameters dependent on which information the user desires.


# How to run LIRI

## Concerts 
The concert-this parameter, which is used to receive information about concerts, must be executed 
in the following syntax structure:  
node liri.js concert-this **`<artist/band name here>`**

This request will return the follwoing concert information:

1. The Location
2. The Venue 
3. The Date

<img src="assets/read-me-images/concert-this-1.png">

The **LIRI** application will also inform you if it does not find the requested information regarding  an artist or band.

<img src="assets/read-me-images/concert-this-2.png">


## Songs

The spotify-this-song  parameter, is used to render information about songs. In oder to use this feature the following syntax must be used:  

node liri.js spotify-this-song **`<song name here>`**

This request will return the follwoing information about the desired song:

1. The artis name
2. The song's name 
3. The song's Spotify link
4. The album's name

<img src="assets/read-me-images/spotify-this-song-1.png">

In case a parameter is not provided, the application render the inforamation for the dafautl song "The Sign" by the Swedish pop group Ace of Base.

node liri.js spotify-this-song

<img src="assets/read-me-images/spotify-this-song-2.png">