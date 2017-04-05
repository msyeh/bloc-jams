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

var albumTotoro = {
     title: 'Totoro Jazz',
     artist: 'Hayao Miyazaki',
     label: 'Studio Ghibli',
     year: '1996',
     albumArtUrl: 'assets/images/album_covers/totoro-jazz.jpeg',
     songs: [
         { title: 'Neko Bus', duration: '2:25' },
         { title: 'Mother\'s House', duration: '4:30' },
         { title: 'Ear of Corn', duration: '2:40'},
         { title: 'Three Little Sprouts', duration: '4:24' },
         { title: 'The Wind', duration: '3:30'}
     ]
};

var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
     return template;
};

// All HTML elements required to display on album page
var albumTitle = document.getElementsByClassName('album-view-title')[0];
var albumArtist = document.getElementsByClassName('album-view-artist')[0];
var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
var albumImage = document.getElementsByClassName('album-cover-art')[0]
var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

var setCurrentAlbum = function(album) {
    
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



window.onload = function() {
    
    var albumArray = [albumPicasso, albumMarconi, albumTotoro];
    var i = 0;
    
    setCurrentAlbum(albumArray[0]);
    
    albumImage.addEventListener('click', function(e){
        setCurrentAlbum(albumArray[i++]);
        if (i==albumArray.length) i = 0;
    });
};