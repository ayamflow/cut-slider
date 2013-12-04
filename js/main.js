$(document).ready(init);

var imageSwitch = 0,
slicesNumber = 6,
transitionDuration = 2;

function init() {
    var $wrapper = $('#slider'), $medium, $slide;

    for(var i = 0; i < slicesNumber; i++) {
        $medium = $('<div class="slide-medium"></div>');
        $slide = $('<div class="slide slide' + (i + 1) + '">');
        $wrapper.append($slide);
        $slide.append($medium);
    }

    var nextUrl = getNextImageUrl();
    initNextImage(nextUrl);

    // kickIt();
}

function kickIt() {
    var url = getNextImageUrl();
    initNextImage(url);
    startTransition();
}

function slideComplete(i) {
    if(i == slicesNumber - 1) {
        kickIt();
    }
}

function getNextImageUrl() {
    if(imageSwitch === 0) {
        imageSwitch = 1;
        return "img/wall-rock.jpg";
    }
    else {
        imageSwitch = 0;
        return "img/wall-statues.jpg";
    }
}

function initNextImage(url) {
    var $slides = $('.slide-medium'), $slide;
    for(var i = 0; i < $slides.length; i++) {
        $slide = $slides.eq(i);
        var imageClass = "image" + imageSwitch;
        var $deep = $('<div class="slide-deep ' + imageClass + '"></div>');
        var $image = $('<img src="' + url + '" />');
        $slide.prepend($deep);
        $deep.append($image);
    }
}

function startTransition() {
    for(var i = slicesNumber; i >= 0; i--) {
        var $slide = $('.slide' + (slicesNumber - i + 1)).find('.slide-deep.image' + Number(!imageSwitch));
        // TweenMax.to($slide, transitionDuration, {left: $slide.position().left + 2000, delay: i * transitionDuration / slicesNumber / 4, ease: Cubic.easeInOut, onComplete: slideComplete, onCompleteParams: [i]});
        TweenMax.to($slide, transitionDuration, {x: 2000, delay: i * transitionDuration / slicesNumber / 4, ease: Cubic.easeInOut, onComplete: slideComplete, onCompleteParams: [i]});

        var $nextSlide = $('.slide' + (i)).find('.slide-deep.image' + imageSwitch);
        console.log($nextSlide);
        // TweenMax.to($slide, transitionDuration, {left: $slide.position().left + 2000, delay: i * transitionDuration / slicesNumber / 4, ease: Cubic.easeInOut});
    }
}