$(document).ready(function() {
  $('#submit-thread').on('click', function() {
    if(isThreadRight()) saveThreadToDataBase();
  });
});
function isThreadRight() {
  var storyTitle = $('#thread-title').val();
  var storyText = $('#thread-text').val();

  if((storyTitle.length>1) && (storyText.length>1)) {
    return true;
  } else {
    alert('Make sure you gave it a title, and text.');
    return false;
  }
}
function saveThreadToDataBase() {
  console.log('Correct data');
}
