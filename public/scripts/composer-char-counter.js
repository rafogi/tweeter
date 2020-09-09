$(document).ready( () => {
  $('#tweetText').on("keyup", function(){
    let count = $('#tweetText').val().length;
    const max = 140
    let remaining = max - count;
    $('#counter').html(remaining);
    if (remaining < 0) {
      $('#counter').addClass('red');
      console.log(remaining);
    } else {
      $('#counter').removeClass('red');
    }
  })

})