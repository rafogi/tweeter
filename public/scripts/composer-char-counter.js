$(document).ready( () => {
  const updateCount = function () {
  let count = $('#tweetText').val().length;
  const max = 140
  let remaining = max - count;
  $('#counter').text(remaining);
  if (remaining < 140) {
    $('.error-message2').slideUp();
  }
  if (remaining < 0) {
    $('#counter').addClass('red');
  } else {
    $('#counter').removeClass('red');
    $('.error-message1').slideUp();
  }
}

$('#tweetText').keyup(updateCount);
});
