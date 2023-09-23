async function movieDataAPI(show) {
  try {
    var response = await fetch(
      "https://movie-data-a9dcjjcln-technosapien.vercel.app/api/search?q=" +
        encodeURIComponent(show)
    );
    var data = await response.json(); // Await the reading of the response body
    // Update the score or any other logic based on the data
    score = data.imdb_rating || "Not Found";
    // console.log(data)
    return score;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function findAncestor(el, selector) {
  while ((el = el.parentElement) && !el.matches(selector));
  return el;
}

function createHitZone(score, hitzone) {
  if (!hitzone.querySelector(".mediainsights-score")) {
    var scoreElement = document.createElement("div");
    scoreElement.className = "mediainsights-score"; // Add a class for identification
    scoreElement.style.position = "absolute";
    scoreElement.style.width = "100%";
    scoreElement.style.right = "10%";
    scoreElement.style.background = "#ffffffeb";
    scoreElement.style.borderTopLeftRadius = "10px";
    scoreElement.style.borderTopRightRadius = "40px";
    scoreElement.style.borderBottomLeftRadius = "40px";
    scoreElement.style.borderBottomRightRadius = "10px";

    var h3Element = document.createElement("h3");
    h3Element.style.display = "flex";
    h3Element.style.justifyContent = "center";
    h3Element.style.color = "#ffae00";

    // Check if score is "Not found" if so reduce font size
    if (score == "Not Found") {
      h3Element.style.fontSize = "80%";
    }
    h3Element.style.textShadow = "1px 1px 2px rgba(0, 0, 0, 0.5)";
    h3Element.textContent = "IMDB Score: " + score;

    scoreElement.appendChild(h3Element);
    hitzone.appendChild(scoreElement);
  }
}

function netflix() {
  var observer = new MutationObserver(function () {
    document.querySelectorAll(".slider-item").forEach(function (sliderItem) {
      // Check if the event listener has already been attached
      if (!sliderItem.dataset.processed) {
        sliderItem.dataset.processed = "true"; // Mark the element as processed
        sliderItem.addEventListener("mouseenter", async function () {
          var show = sliderItem.querySelector(".title-card-container")
            .firstChild.firstChild.firstChild.innerText;
          var score = await movieDataAPI(show);
          setTimeout(function () {
            var hitzone = document.querySelector(".previewModal--wrapper");
            hitzone = hitzone.firstChild.firstChild.lastChild.firstChild;

            // Check if the score element already exists in the hitzone
            createHitZone(score, hitzone);
          }, 400);
        });
      }
    });
  });

  observer.observe(document.querySelector(".lolomo"), {
    childList: true,
    subtree: true, // Observe changes to descendants
  });
}

function hboMax() {
  // Select the closest common parent of the target elements.
  // For this example, I'm using the document, but you can use a closer parent if available.
  const parent = document;

  parent.addEventListener("mouseover", async function (event) {
    const parentOfTarget = event.target.parentNode;

    // Check if the p tag with classname hNuObL exists within parentOfTarget
    const show = parentOfTarget.querySelector("p.hNuObL");
    if (show !== null) {
      var hitzone = show.parentNode.parentNode;
      // Checking for shows name in show and passing to movieDataAPI
      var score = await movieDataAPI(show.innerText);
      createHitZone(score, hitzone);
    }
  });
}

var rootURL = window.location.origin;

switch (rootURL) {
  case "https://play.max.com":
    hboMax();
    break;
  case "https://www.netflix.com":
    netflix();
    break;
}
