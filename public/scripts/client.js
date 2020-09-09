$(() => {
const renderTweets = function(tweets) {
  // loops through tweets
  for(const tweet of tweets) {
    // console.log(tweet);
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
        <img class ='avatar' src= "${base.user.avatars}">
        <p class ='username'>${base.user.name}</p>
      </div>
      <p class = 'handle'>${base.user.handle}</p>
    </div>
  </header>
  <div class = "message">
    <p>${base.content.text}</p>
  </div>
  <footer>
    <div class = 'tweet-foot'>
    <p class = 'date'>${base.created_at}</p>
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

  $.post('/tweets', serializedData)
    .then(function(response) {
    fetchPosts();
    $(this).children('input').val('');

  })
})

fetchPosts();

})