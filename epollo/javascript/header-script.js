$(document).ready(function () {
  $('#header').load('../pages/header.txt');

  // show log in/out link
  $.get('/auth/currentUser', (response) => {
    if (response === false) { // not logged in
      $('#log-in-with-google').show();
    } else { // logged in
      $('#log-out').show();
    }
  });
});
