var observer = new MutationObserver(function() {
  document.querySelectorAll('.slider-item').forEach(function(sliderItem) {
      // Check if the event listener has already been attached
      if (!sliderItem.dataset.processed) {
          sliderItem.dataset.processed = 'true'; // Mark the element as processed
          sliderItem.addEventListener('mouseenter', async function() {
              var show = sliderItem.querySelector('.title-card-container').firstChild.firstChild.firstChild.innerText;
              var score = 'Not Found';

              try {
                  var response = await fetch("https://movie-data-ag9v36bd8-technosapien.vercel.app/api/search?q=" + encodeURIComponent(show));
                  var data = await response.json(); // Await the reading of the response body
                  console.log(data);
                  // Update the score or any other logic based on the data
                  score = data.imdb_rating || 'Not Found';
              } catch (error) {
                  console.error("Error fetching data:", error);
              }

              console.log(show);

              setTimeout(function() {
                  var hitzone = document.querySelector('.previewModal--wrapper');
                  hitzone = hitzone.firstChild.firstChild.lastChild.firstChild;
                  
                  console.log("Hitzone", hitzone);

                  // Check if the score element already exists in the hitzone
                  if (!hitzone.querySelector('.mediainsights-score')) {
                      var scoreElement = document.createElement('div');
                      scoreElement.className = 'mediainsights-score'; // Add a class for identification
                      scoreElement.innerHTML = '<h3>IMDB Score: ' + score + '</h3>';
                      hitzone.appendChild(scoreElement);
                  }
              }, 400);
          });
      }
  });
});

observer.observe(document.querySelector('.lolomo'), {
  childList: true,
  subtree: true // Observe changes to descendants
});
