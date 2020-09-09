
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
    <p class = 'date'>${escape(base.created_at)}</p>
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
    const $content = $('<p>').text('Too long yo!').addClass('error-message').fadeIn(200).fadeOut(4500);
    $('.new-tweet').prepend($content);
  } else if (serializedData.length === 5) {
    const $content = $('<p>').text('Say something!!').addClass('error-message').fadeIn(200).fadeOut(4500);;
    $('.new-tweet').prepend($content)
  } else {
    $.post('/tweets', serializedData)
      .then(function(response) {
      fetchPosts();
      $(this).children('input').val('');
    })
  }
})

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}



