$(document).ready(function() {
  $('#submit-story').on('click', selectGenre);
});
function selectGenre() {
  // Checking if user selected something or not
  if(isStoryRight()) saveStoryToDataBase();
}
function isStoryRight() {
  var selectedGenres = $('#genres').val();
  var storyTitle = $('#story-title').val();
  var storyText = $('#story-text').val();
  
  // These shoud be smaller than the shortest genre name
  if((storyTitle.length>1) && (storyText.length>1) && (selectedGenres.length>1)) {
    return true;
  } else {
    alert('Make sure you gave it a title, text, and at least 1 genre');
    return false;
  }
}
function saveStoryToDataBase() {
  console.log('Correct data');
}
