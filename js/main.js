// listen for form submit
document.getElementById("myForm").addEventListener("submit", saveBookmark);

function saveBookmark(e) {
  // get form values
  var siteName = document.getElementById("siteName").value;
  var siteUrl = document.getElementById("siteUrl").value;

  if (!validateForm(siteName, siteUrl)) {
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteUrl
  }

  // Local storage Test (only strings)
  if (localStorage.getItem("bookmarks") === null) {
    // init array
    var bookmarks = [];
    // add to array
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  } else {
    // get/fetch bookmarks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    // add bookmark to array
    bookmarks.push(bookmark);
    // reset to local storage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    // clear form
    document.getElementById('myForm').reset();

    // refetch bookmarks
    fetchBookmarks();

  }



  // Prevent form from submiting so i can see what's happening
  e.preventDefault();
}

// Delete bookmarks
function deleteBookmark(url) {
  // get bookmark from local storage
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

  // loop through bookmarks
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {
      //remove from array
      bookmarks.splice(i, 1);
    }
  }
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  // refetch bookmarks
  fetchBookmarks();

}




// Fetch bookmarks and display them on screen
function fetchBookmarks() {
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

  // Get output id
  var bookmarkResults = document.getElementById("bookmarksResults");

  // build output
  bookmarkResults.innerHTML = "";
  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarkResults.innerHTML += '<div class="well">' +
      '<h3>' + name +
      ' <a class="btn btn-default" target="_blank" href="' + url + '">Visit</a> ' +
      ' <a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger" href="#">Delete</a> ' +
      '</h3>' +
      '</div>';
  }

}


function validateForm(siteName, siteUrl) {
  // VALIDATION
  if (!siteName || !siteUrl) {
    alert('Παρακαλώ δώστε σωστά το όνομα ΜΗ ΧΕΣΩ!')
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    alert('Παρακαλώ δώστε τη σωστή διεύθυνση ΜΗ ΧΕΣΩ!')
    return false;
  }
  return true;
}