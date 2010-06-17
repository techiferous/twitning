/*********************
 * 
 *  Initialization
 *
 */

var numSlides;
var slideMargin = 30;
var slideWidth = screen.width + slideMargin;
var slideHeight = screen.height;
var secondsPerSlide = 10;

$(function() {
  numSlides = $('section').size();
  initializeSlideshowStyles();
  $('#play').click(function(event) {
    startAutoplay();
  });
});

function initializeSlideshowStyles() {
  $('#slideshow').width(numSlides * slideWidth);
  $('#slideshow').height(slideHeight);
  $('section').width(slideWidth - slideMargin);
  $('section').css('margin-right', slideMargin);
  $('section').height(slideHeight);
}

/*********************
 * 
 *  Key Events
 *
 */

$(document).keydown(function(event) {
  // right arrow or space
  if ((event.which == 39) || (event.which == 32)) {
    goToSlide(currentSlideNumber() + 1);
    return false;
  }
  // left arrow
  else if (event.which == 37) {
    goToSlide(currentSlideNumber() - 1);
    return false;
  }
  // esc
  else if (event.which == 27) {
    stopAutoplay();
    return false;
  }
});

/*********************
 * 
 *  Slide Navigation
 *
 */

function goToSlide(slideNumber) {
  if (slideNumber < 1) {
    slideNumber = 1;
  }
  if (slideNumber > numSlides) {
    slideNumber = numSlides;
  }
  var targetScrollPosition = (slideNumber-1) * slideWidth;
  $(window).scrollLeft(targetScrollPosition);
}

function currentSlideNumber() {
  // we add a pixel to avoid a type of fencepost problem
  var currentHorizontalScrollPosition = $(window).scrollLeft() + 1;
  return Math.ceil(currentHorizontalScrollPosition / slideWidth);
}

/*********************
 * 
 *  Automatic Slide Advancement
 *
 */

function startAutoplay() {
  $('#play').hide();
  autoAdvanceSlide();
  automaticSlides = setInterval('autoAdvanceSlide()', 1000 * secondsPerSlide);
}

function autoAdvanceSlide() {
  goToSlide(currentSlideNumber() + 1);
  if (currentSlideNumber() == numSlides) {
    stopAutoplay();
  }
}

function stopAutoplay() {
  clearInterval(automaticSlides);
  $('#play').show();
}
