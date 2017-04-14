var albumPicasso = {
     title: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/01.png',
     songs: [
         { title: 'Blue', duration: '4:26' },
         { title: 'Green', duration: '3:14' },
         { title: 'Red', duration: '5:01' },
         { title: 'Pink', duration: '3:21'},
         { title: 'Magenta', duration: '2:15'}
     ]
};
 
var albumMarconi = {
     title: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { title: 'Hello, Operator?', duration: '1:01' },
         { title: 'Ring, ring, ring', duration: '5:01' },
         { title: 'Fits in your pocket', duration: '3:21'},
         { title: 'Can you hear me now?', duration: '3:14' },
         { title: 'Wrong phone number', duration: '2:15'}
     ]
};

var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
     return template;
};

var setCurrentAlbum = function(album) {
     // Select all HTML elements required to display on album page
     var albumTitle = document.getElementsByClassName('album-view-title')[0];
     var albumArtist = document.getElementsByClassName('album-view-artist')[0];
     var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
     var albumImage = document.getElementsByClassName('album-cover-art')[0];
     var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
 
     // Identify first child node of an element. Use nodeValue to return or set value of node.
     albumTitle.firstChild.nodeValue = album.title;
     albumArtist.firstChild.nodeValue = album.artist;
     albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
     albumImage.setAttribute('src', album.albumArtUrl);
 
     // Clear the value of the HTML element with class album-view-song-list
     albumSongList.innerHTML = '';
 
     // Use for loop to insert songs from specified album object into HTML using the innerHTML property
     // The createSongRow function is called at each loop, passing in song number, name, duration arguments
     // from the album object
     for (var i = 0; i < album.songs.length; i++) {
         albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
     }
};
//CHANGE SONG NUMBER TO PAUSE BUTTON WHEN CLICKED TO PLAY:
//Traverse DOM upward until parent with specified class name is found
var findParentByClassName = function(element, targetClass) {
    if (element) {
        var currentParent = element.parentElement;
        while (currentParent.className !== targetClass && currentParent.className !== null) {
            currentParent = currentParent.parentElement;
        }
        return currentParent; 
    } else if (element.parentElement == null) { //if starting element has no parent
        console.log("No parent found");
    } else { //if fail to find parent with given class name
        console.log("No parent found with that class name");
    }
};
//Take an element; based on its class name(s), return the element with .song-item-number class
var getSongItem = function(element) {
    switch (element.className) {
        case 'album-song-button': //if element's class name is 'album-song-button' (refers to play button link)
        case 'ion-play':
        case 'ion-pause':
            return findParentByClassName(element, 'song-item-number');
        case 'album-view-song-item':
            return element.querySelector('.song-item-number'); //returns element's first child with stated class
        case 'song-item-title':
        case 'song-item-duration':
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        case 'song-item-number':
            return element;
        default:
            return;
    }
};

var clickHandler = function(targetElement) {
    
    var songItem = getSongItem(targetElement);
    
    if (currentlyPlayingSong === null) { //if no song has been clicked
        songItem.innerHTML = pauseButtonTemplate; //change innerHTML of song item number to pause button
        currentlyPlayingSong = songItem.getAttribute('data-song-number'); //set current song to the selected song number
    } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) { //if current song is selected again
        songItem.innerHTML = playButtonTemplate; //change innerHTML of song item number to play button
        currentlyPlayingSong = null; 
    } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) { //if current song isn't selected again
        //Get the first element matching the specified selector in the document 
        var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
        //change the innerHTML of the old song to song number
        currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
        //change the innerHTML of new song item number to pause button
        songItem.innerHTML = pauseButtonTemplate;
        //set current song to new song item's number
        currentlyPlayingSong = songItem.getAttribute('data-song-number');
     }
};
 
var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

//Set currently playing song to 'null' so that no song shows as 'playing' until a song is clicked
var currentlyPlayingSong = null;

window.onload = function() {
    setCurrentAlbum(albumPicasso);
    
    //CHANGE SONG NUMBER TO PLAY BUTTON WHEN MOUSE HOVERS
    songListContainer.addEventListener('mouseover', function(event) {
         if (event.target.parentElement.className === 'album-view-song-item'){
             
             //cache song item that we are hovering over in a variable
             var songItem = getSongItem(event.target); 
             
             //if song we are hovering over has not been clicked, change content to play button
             if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
                 songItem.innerHTML = playButtonTemplate;
             }
         }
     });
    
    for (var i = 0; i < songRows.length; i++) {
        //CHANGE PLAY BUTTON TO SONG NUMBER WHEN MOUSE LEAVES
        songRows[i].addEventListener('mouseleave', function(event){
            
            var songItem = getSongItem(event.target); //cache song item that we are leaving in a variable
            var songItemNumber = songItem.getAttribute('data-song-number'); //cache song number in variable
            
            //if item that mouse is leaving is not the current song, change the content to song number
            if (songItemNumber !== currentlyPlayingSong) {
                songItem.innerHTML = songItemNumber;
            }
        });
        
        //CHANGE VALUE OF CURRENTLY PLAYING SONG WHEN SONG IS CLICKED
        songRows[i].addEventListener('click', function(event){
            clickHandler(event.target);
        });
        
    }
};