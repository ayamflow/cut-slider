$(document).ready(init);

var imageSwitch = 0,
slicesNumber = 8,
transitionDuration = 1;

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

    kickIt();
}

function kickIt() {
    var url = getNextImageUrl();
    initNextImage(url);
    startTransition();
}

function slideComplete(i) {
    $('.slide-deep.image' + Number(!imageSwitch)).eq(i).remove();

    // if(i == slicesNumber - 1) {
    //     setTimeout(kickIt, 300);
    // }
}

function getNextImageUrl() {
    if(imageSwitch === 0) {
        imageSwitch = 1;
        return "img/wall-statues.jpg";
    }
    else {
        imageSwitch = 0;
        return "img/wall-rock.jpg";
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
    var i, slideIndex, $slide, $nextSlide, delay;
    for(i = slicesNumber; i > 0; i--) {
        delay = i * transitionDuration / slicesNumber / 2;

        slideIndex = slicesNumber - i + 1;
        $slide = $('.slide' + slideIndex).find('.slide-deep.image' + Number(!imageSwitch));
        TweenMax.to($slide, transitionDuration, {x: 2000, delay: delay, onComplete: slideComplete, onCompleteParams: [slideIndex - 1]});

        delay += 0.1;

        $nextSlide = $('.slide' + slideIndex).find('.slide-deep.image' + imageSwitch);
        TweenMax.from($nextSlide, transitionDuration / 2, {x: 0, delay: delay});
    }
}