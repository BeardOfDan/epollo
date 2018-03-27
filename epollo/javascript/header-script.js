$(document).ready(function () {
  $('#header').load('../pages/header.txt');

  // hide/show log in/out links
  $.get('/auth/currentUser', (response) => {
    if (response === false) { // not logged in
      $('#log-in-with-google').show();
      $('#log-out').hide();
    } else { // logged in
      $('#log-in-with-google').hide();
      $('#log-out').show();
    }
  });

});
