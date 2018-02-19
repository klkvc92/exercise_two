//Listen For Form Submit
document.getElementById('myForm').addEventListener('submit',saveBookmark);

//Some Bookmark
function saveBookmark(e){
  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

  if(!siteName || !siteUrl){
    alert('Please fill in the form');
    return false;
  }


  var bookmark = {
    name: siteName,
    url: siteUrl
  }


  /*
  localStorage.setItem('test','Hello World');
  console.log(localStorage.getItem('test'));
  localStorage.removeItem('test');
  console.log(localStorage.getItem('test'));
  */

  var bookmarks = [];
  if (localStorage.getItem('bookmarks') === null) {


    bookmarks.push(bookmark);
    
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

    console.log(localStorage.getItem('bookmarks'));


 }else {
 
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  bookmarks.push(bookmark);
  localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
}

  e.preventDefault();
  fetchBookmarks();
}

function deleteBookmark(url){
 var bookmark = JSON.parse(localStorage.getItem('bookmarks'));


  for (var i = 0; i < bookmark.length; i++) {
    console.log(bookmark[i]);
    if(bookmark[i].url == url){
      bookmark.splice(i,1);
    }
  }

  localStorage.setItem('bookmarks',JSON.stringify(bookmark));


  fetchBookmarks();
}

function fetchBookmarks(){
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  console.log(bookmarks);

  var bookmarksResults = document.getElementById('bookmarksResults');

  bookmarksResults.innerHTML = '';


  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;
    bookmarksResults.innerHTML += `<div class='well'>
                                  <h3>${name}
                                   <a class='btn btn-default' href='${url}'>Visit</a>
                                   <a onclick='deleteBookmark(\"${url}"\)'class='btn btn-danger' href='#'>Delete</a>
                                  </h3>
                                  </div>`;


  }
}
