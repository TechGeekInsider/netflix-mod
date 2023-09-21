var observer = new MutationObserver(function() {
  document.querySelectorAll('.slider-item').forEach(function(sliderItem) {
      // Check if the event listener has already been attached
      if (!sliderItem.dataset.processed) {
          sliderItem.dataset.processed = 'true'; // Mark the element as processed
          sliderItem.addEventListener('mouseenter', function() {
              var show = sliderItem.querySelector('.title-card-container').firstChild.firstChild.firstChild.innerText;
              var score = 'Not Found';

              console.log(show);

              setTimeout(function() {
                  var hitzone = document.querySelector('.previewModal--wrapper');
                  hitzone = hitzone.firstChild.firstChild.lastChild.firstChild;
                  
                  console.log("Hitzone", hitzone);

                  // Check if the score element already exists in the hitzone
                  if (!hitzone.querySelector('.metacritic-score')) {
                      var scoreElement = document.createElement('div');
                      scoreElement.className = 'metacritic-score'; // Add a class for identification
                      scoreElement.innerHTML = '<h3>MetaCrtic Score: ' + score + '</h3>';
                      hitzone.appendChild(scoreElement);
                  }
              }, 1000);
          });
      }
  });
});

observer.observe(document.querySelector('.lolomo'), {
  childList: true,
  subtree: true // Observe changes to descendants
});
