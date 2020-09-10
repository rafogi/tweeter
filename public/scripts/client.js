

const renderTweets = function(tweets) {
  // loops through tweets
  for(const tweet of tweets) {
    // calls createTweetElement for each tweet
    let newTweet = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $('.old-tweets').prepend(newTweet)
  }
}


const createTweetElement = function(base) {
  const tweetHtml = `
  <section class = tweet-container>
  <header>
    <div class = tweet-head>
      <div class = 'user'>
        <img class ='avatar' src= "${escape(base.user.avatars)}">
        <p class ='username'>${escape(base.user.name)}</p>
      </div>
      <p class = 'handle'>${escape(base.user.handle)}</p>
    </div>
  </header>
  <div class = "message">
    <p>${escape(base.content.text)}</p>
  </div>
  <footer>
    <div class = 'tweet-foot'>
    <p class = 'date'>${escape(timeSince(base.created_at))}</p>
    <div class = 'ticons'>
    <i class="fas fa-flag"></i>
    <i class="fas fa-retweet"></i>
    <i class="fas fa-heart"></i>
  </div>
  </div>
  </footer>
</section>
  `;
  // $('.old-tweets').prepend(tweetHtml);
return tweetHtml;
}

// createTweetElement(data[0]);

const fetchPosts = () => {
  // make a GET request to `/tweets`
  $.ajax({
    url: '/tweets',
    method: 'GET',
    dataType: 'json',
    success: (posts) => {
      renderTweets(posts);
    },
    error: (error) => {
      console.error(error);
    }
  });
};



const $postForm = $('.tweet-button');

$postForm.on('submit', function (event) {
  // prevent the default browser behaviour
  event.preventDefault();
  const serializedData = $(this).serialize();
  if (serializedData.length > 145) {
    $('.new-tweet').find('.error-message1').slideDown('slow');
    return;
  } else if (serializedData.length === 5) {
    $('.new-tweet').find('.error-message2').slideDown('slow');
    return;
  } else {
    $.post('/tweets', serializedData)
      .then(function(response) {
      $('.old-tweets').empty();
      $('#tweetText').val('');
      $('#counter').text('140');
      fetchPosts();
    })
  }
})

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function timeSince(date) {

  let seconds = Math.floor((new Date() - date) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

fetchPosts();

