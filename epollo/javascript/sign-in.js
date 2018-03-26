$(document).ready(function() {
  $('#submit-registration').on('click', function() {
    if($('#terms-button').is(':checked')) {
      // Sending requiest to the server
      $.post('/sign', {
        fullName: $('#full-name-field').val(),
        email: $('#email-field').val(),
        username: $('#username-field').val(),
        password: $('#password-field').val()
      }, function(data) {
        if(data == 'done') alert('Sign succes');
        else alert('Make sure your password has numbers, uppercase, lowercase letters in it, and it has at least 8 characters.');
      });
    }
  });
  $('submit-sign-in').on('click', function() {
    $.post('/login', {
      username: $('#sign-in-username').val(),
      password: $('#sign-in-password').val()
    });
  });
});
