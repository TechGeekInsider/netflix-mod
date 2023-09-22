async function movieDataAPI(show){
    try {
        var response = await fetch("https://movie-data-95ys3thgd-technosapien.vercel.app/api/search?q=" + encodeURIComponent(show));
        var data = await response.json(); // Await the reading of the response body
        // Update the score or any other logic based on the data
        score = data.imdb_rating || 'Not Found';
        return score
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function createHitZone(score, hitzone) {
    if (!hitzone.querySelector('.mediainsights-score')) {
        var scoreElement = document.createElement('div');
        scoreElement.className = 'mediainsights-score'; // Add a class for identification
        scoreElement.innerHTML = '<h3>IMDB Score: ' + score + '</h3>';
        scoreElement.style.position = 'absolute';
        hitzone.appendChild(scoreElement);
    }
}

function netflix(){
    var observer = new MutationObserver(function() {
        document.querySelectorAll('.slider-item').forEach(function(sliderItem) {
            // Check if the event listener has already been attached
            if (!sliderItem.dataset.processed) {
                sliderItem.dataset.processed = 'true'; // Mark the element as processed
                sliderItem.addEventListener('mouseenter', async function() {
                    var show = sliderItem.querySelector('.title-card-container').firstChild.firstChild.firstChild.innerText;
                    var score = await movieDataAPI(show)
                    setTimeout(function() {
                        var hitzone = document.querySelector('.previewModal--wrapper');
                        hitzone = hitzone.firstChild.firstChild.lastChild.firstChild;
                        
                        // Check if the score element already exists in the hitzone
                        createHitZone(score, hitzone)
                    }, 400);
                });
            }
        });
      });
      
      observer.observe(document.querySelector('.lolomo'), {
        childList: true,
        subtree: true // Observe changes to descendants
      });
}

function hboMax() {
    // Select the closest common parent of the target elements.
    // For this example, I'm using the document, but you can use a closer parent if available.
    const parent = document;
  
    parent.addEventListener('mouseover', async function(event) {
      const parentOfTarget = event.target.parentNode;
      
      // Check if the p tag with classname hNuObL exists within parentOfTarget
      const show = parentOfTarget.querySelector('p.hNuObL');
      var hitzone = show.parentNode.parentNode

      // Checking for shows name in show
      if (show) {
        var score = await movieDataAPI(show.innerText)
        createHitZone(score, hitzone)
      }
  });
}

var rootURL = window.location.origin;

switch(rootURL) {
    case "https://play.max.com":
        hboMax()
        break;
    case "https://www.netflix.com":
        netflix()
        break;
}
