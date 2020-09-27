/*  ---------------------------------------------------
  --> Template Name: DJ
  --> Description: HTML Music Template
  --> Author: Mohammed Taysser
  --> Author telegram: @Mohammedtaysser
  --> Version: 3.1
  --> Created: Colorlib
---------------------------------------------------------  */

$(function() {
  'use strict';
  // --------------------- Preloader  ---------------------

  $(window).on('load', function() {
    $(".loader").fadeOut();
    $('body').delay(2000).css('overflow', 'auto');
    $("#loading").delay(100).fadeOut("slow");
  });

  const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;
  let countDown = new Date('13 nov 2020 00:00:00').getTime(),
    x = setInterval(function() {
      'use strict';
      let now = new Date().getTime(),
        distance = countDown - now;
      document.getElementById('days').textContent = Math.floor(distance / (day)),
        document.getElementById('hours').textContent = Math.floor((distance % (day)) / (hour)),
        document.getElementById('minutes').textContent = Math.floor((distance % (hour)) / (minute)),
        document.getElementById('seconds').textContent = Math.floor((distance % (minute)) / second);

      //do something later when date is reached
      if (distance < 0) {
        clearInterval(x);
        //'IT'S MY BIRTHDAY!;
      }
    }, second);

  // --------------------- smooth scroll ---------------------

  $('header .down-arrow').on('click', function() {
    $('html,body').animate({
      scrollTop: $('#UPCOMING').offset().top - 20
    }, 1000);
  });

  // --------------------- owl Carousel ---------------------

  $("article .events .owl-carousel").owlCarousel({
    loop: true,
    margin: 15,
    items: 3,
    dots: false,
    smartSpeed: 1500,
    autoHeight: false,
    autoplay: true,
    navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
    nav: true,
    responsiveClass: true,
    responsive: {
      992: {
        items: 3,
      },
      768: {
        items: 2,
      },
      0: {
        items: 1,
      },
    }
  });

  // --------------------- Nice Scroll	---------------------

  $(".nice-scroll").niceScroll({
    cursorcolor: "#111111",
    cursorwidth: "5px",
    background: "#e1e1e1",
    cursorborder: "",
    autohidemode: false,
    horizrailenabled: false
  });

  // --------------------- jPlayer---------------------

  $('.track .main-content .single-music-container .control-button button.jp-play').on('click', function() {
    $(this).toggleClass('active');
    $(this).next().toggleClass('active');
    var progressInterval = setInterval(() => {
      var jp_progress = $(this).parent('.track .main-content').has('.jp-seek-bar .jp-play-bar');
      if (parseInt(jp_progress.css('width')) == parseInt(jp_progress.parent().css('width')) - 5) {
        $(this).next().toggleClass('active');
        $(this).toggleClass('active');
        clearInterval(progressInterval);
      }
    }, 500);
  });

  $('.track .main-content .control-button button.jp-stop').on('click', function() {
    $(this).toggleClass('active');
    $(this).prev().toggleClass('active');
  });

  // ---------------------	Barfiller ---------------------

});