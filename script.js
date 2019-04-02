var observer = new MutationObserver(function() {
  $(".slider-item").mouseover(function() {
    var show = $(this).find(".title-card-container")[0].firstChild.firstChild
      .firstChild.innerText;
    var score = "Not Found";
    if (show == "Altered Carbon") {
      score = "62.9%";
    }
    if (show == "Black Mirror") {
      score = "97.3%";
    }
    if (show == "Dirty Money") {
      score = "72.6%";
    }
    if (show == "Pirates of the Caribbean: Dead Men Tell No Tales") {
      score = "52.3%";
    }
    if (show == "Dave Chappelle: Equanimity & The Bird Revelation") {
      score = "98.2%";
    }
    if (show == "The Office (U.S.)") {
      score = "85.3%";
    }
    if (show == "A Futile and Stupid Gesture") {
      score = "42.1%";
    }
    $(this)
      .find(".bob-play-hitzone")
      .html("<div><h3>Rotten Tomatoe Score: " + score + "</h3></div>")
      .css("position: absolute");
  });
});
observer.observe(document.getElementsByClassName("lolomo")[0], {
  childList: true
});
