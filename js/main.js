$(document).ready(init);

/* TODO
    - enable easy configuration (slicesNumber, duration, multiples images...)
    - Slide selector
 */

var imageIndex = 0,
    // imagesUrl = ["img/news4.jpg", "img/news5.jpg"],
    imagesUrl = ["img/wall-statues.jpg", "img/wall-rock.jpg"],
    imagesNumber,
    slicesNumber = 8,
    transitionDuration = 0.6,
    $wrapper;

function init() {
    var $medium, $slide;

    $wrapper = $('#slider');
    imagesNumber = imagesUrl.length;

    for(var i = 0; i < slicesNumber; i++) {
        $medium = $('<div class="slide-medium"></div>');
        $slide = $('<div class="slide slide' + (i + 1) + '">');
        $wrapper.append($slide);
        $slide.append($medium);
    }

    var nextUrl = getNextImageUrl();
    initNextImage(nextUrl);

    kickIt();
}

function kickIt() {
    var url = getNextImageUrl();
    initNextImage(url);
    startTransition();
}

function slideComplete(i) {
    $('.slide-deep.image' + Number(!imageIndex)).eq(i).remove();

    if(i == slicesNumber - 1) {
        console.log('hey');
        setTimeout(kickIt, transitionDuration * 1000);
    }
}

function getNextImageUrl() {
    imageIndex = Number(!imageIndex);
    return imagesUrl[imageIndex];
}

function initNextImage(url) {
    var $slides = $wrapper.find('.slide-medium'), $slide;
    for(var i = 0; i < $slides.length; i++) {
        $slide = $slides.eq(i);
        var imageClass = "image" + imageIndex;
        var $deep = $('<div class="slide-deep ' + imageClass + '"></div>');
        var $image = $('<img src="' + url + '" />');
        $slide.prepend($deep);
        $deep.append($image);
    }
}

function startTransition() {
    var i, slideIndex, $slide, $nextSlide, delay;
    for(i = slicesNumber; i > 0; i--) {
        delay = i * transitionDuration / slicesNumber / 3;

        slideIndex = slicesNumber - i + 1;
        $slide = $wrapper.find('.slide' + slideIndex).find('.slide-deep.image' + Number(!imageIndex));
        TweenMax.to($slide, transitionDuration, {x: i  * 100 / slicesNumber + 2000 , delay: delay, ease: Expo.easeIn});

        $nextSlide = $wrapper.find('.slide' + slideIndex).find('.slide-deep.image' + imageIndex);
        TweenMax.from($nextSlide, transitionDuration / 2, {x: 0, delay: delay + transitionDuration, ease: Expo.easeOut, onComplete: slideComplete, onCompleteParams: [slideIndex - 1]});
    }
}