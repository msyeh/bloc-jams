var buildCollectionItemTemplate = function() {
    var template =
     '<div class="collection-album-container column fourth">'
   + '  <img src="assets/images/album_covers/01.png"/>'
   + '  <div class="collection-album-info caption">'
   + '    <p>'
   + '      <a class="album-name" href="album.html"> The Colors </a>'
   + '      <br/>'
   + '      <a href="album.html"> Pablo Picasso </a>'
   + '      <br/>'
   + '      X songs'
   + '      <br/>'
   + '    </p>'
   + '  </div>'
   + '</div>'
   ;
    //wrap template in jQuery object
    return $(template);
};
    
$(window).load(function() {
     // select element with "album-covers" class name
     var $collectionContainer = $('.album-covers');
     
    // assign empty string to the element's innerHTML property (this sets the element's content to clear)
     $collectionContainer.empty();
 
     // create a for loop that inserts 12 albums - each loop adds contents of album template to element's content
     for (var i = 0; i < 12; i++) {
         var $newThumbnail = buildCollectionItemTemplate();
         $collectionContainer.append($newThumbnail);
     }
 });