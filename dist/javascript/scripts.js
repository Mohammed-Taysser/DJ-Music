"use strict";

// Needed variables
var close_button = document.getElementById('js-menu-toggle'),
    menu_links = document.querySelector('#main-links ul'),
    array_of_slider_id = ['js-up-coming-events'],
    glide_slider_options = {
  type: 'carousel',
  perView: 3,
  autoplay: 5000,
  breakpoints: {
    992: {
      perView: 2
    },
    768: {
      perView: 2
    },
    567: {
      perView: 1
    }
  }
},
    current_year = document.getElementById('js-current-year'),
    header_angle_down = document.querySelector('header .angle-down '),
    hero_header_index_page = document.getElementById('js-header'),
    podcast_ids = document.querySelectorAll('.single-music-container'),
    podcast_container = document.getElementById('js-simple-bar-scroll'),
    festival_days = document.getElementById('js-days'),
    festival_hours = document.getElementById('js-hours'),
    festival_minutes = document.getElementById('js-minutes'),
    festival_seconds = document.getElementById('js-seconds'); // Toggle menu on navbar

close_button.onclick = function (event) {
  'use strict';

  this.classList.toggle('open');
  menu_links.classList.toggle('open');
  event.stopPropagation();
};

menu_links.onclick = function (event) {
  'use strict';

  event.stopPropagation();
};

document.addEventListener('click', function (event) {
  'use strict';

  var event_condition = event.target !== menu_links && event.target !== close_button && menu_links.classList.contains('open');

  if (event_condition) {
    menu_links.classList.toggle('open');
    close_button.classList.toggle('open');
  }
});

if (header_angle_down) {
  header_angle_down.onclick = function () {
    'use strict';

    document.querySelector('#js-up-coming-events').scrollIntoView({
      behavior: 'smooth'
    });
  };
} // Podcast Slider


if (podcast_container) {
  new SimpleBar(podcast_container);
} // Glide slider


array_of_slider_id.forEach(function (slider_id) {
  'use strict';

  var temp = document.getElementById(slider_id);

  if (temp) {
    new Glide(temp, glide_slider_options).mount();
  }
});

function setWindowHeight() {
  'use strict';

  var window_height = window.innerHeight,
      nav_height = document.querySelector('nav').clientHeight;
  hero_header_index_page.style.height = "".concat(window_height - nav_height, "px");
}

if (hero_header_index_page) {
  window.addEventListener('resize', setWindowHeight, false);
  setWindowHeight();
} // Music player 'howler'


if (podcast_ids) {
  (function () {
    var sounds_ids = [];

    var _loop = function _loop(index) {
      var play_btn = podcast_ids[index].querySelector('.player-btn .play'),
          pause_btn = podcast_ids[index].querySelector('.player-btn .pause'),
          volume_input = podcast_ids[index].querySelector('.sound-controller .volume-changer'),
          volume_label = podcast_ids[index].querySelector('.sound-controller .volume-label'),
          progress_bar = podcast_ids[index].querySelector('.play-bar .bar-slider'),
          volume_size = podcast_ids[index].querySelector('.sound-controller .volume-size');
      sounds_ids[index] = new Howl({
        src: [podcast_ids[index].dataset.url],
        html5: true,
        volume: 0.5,
        onend: function onend() {
          'use strict';

          player_pause(play_btn, pause_btn, sounds_ids[index]);
        },
        onload: function onload() {
          'use strict';

          podcast_ids[index].querySelector('.play-bar .duration').textContent = formatTime(sounds_ids[index].duration());
        },
        onplay: function onplay() {
          'use strict';

          requestAnimationFrame(animate_bar.bind(this));
        }
      });
      play_btn.addEventListener('click', function () {
        'use strict'; // for (let podcast = 0; podcast < podcast_ids.length; podcast++) {
        //     const play_button = podcast_ids[podcast].querySelector('.player-btn .play'),
        //         paue_button = podcast_ids[podcast].querySelector('.player-btn .pause');
        //     if (sounds_ids[index].playing()) {
        //         if (!play_button.classList.contains('active')) {
        //             paue_button.classList.remove('active');
        //             play_button.classList.add('active');
        //         }
        //         sounds_ids[index].stop();
        //     }
        //     // if (!play_button.classList.contains('active')) {
        //     //     paue_button.classList.remove('active');
        //     //     play_button.classList.add('active');
        //     // }
        //     // console.log(sounds_ids[index].playing());
        // }

        player_pause(play_btn, pause_btn, sounds_ids[index]);
      });
      volume_input.addEventListener('input', function () {
        'use strict';

        volume_label.dataset.tooltip = volume_size.textContent = volume_input.value + '%';
        sounds_ids[index].volume(volume_input.value / 100);
      });

      function animate_bar() {
        'use strict';

        var seek = sounds_ids[index].seek(),
            inner_progress_bar = podcast_ids[index].querySelector('.play-bar .bar.bar-slider .bar-item');
        podcast_ids[index].querySelector('.play-bar .seek').textContent = formatTime(seek);
        inner_progress_bar.style.width = (seek / this.duration() * 100 || 0) + '%';
        progress_bar.dataset.tooltip = Math.round(seek / this.duration() * 100 || 0) + '%';

        if (this.playing()) {
          requestAnimationFrame(animate_bar.bind(this));
        }
      }
    };

    for (var index = 0; index < podcast_ids.length; index++) {
      _loop(index);
    }
  })();
}

function player_pause(play_btn, pause_btn, sound_id) {
  'use strict';

  if (play_btn.classList.contains('active')) {
    play_btn.classList.remove('active');
    pause_btn.classList.add('active');
    sound_id.play();
  } else {
    pause_btn.classList.remove('active');
    play_btn.classList.add('active');
    sound_id.pause();
  }
}
/**
 * Format the time from seconds to M:SS.
 * @param  {Number} secs Seconds to format.
 * @return {String}      Formatted time.
 */


function formatTime(secs) {
  'use strict';

  var minutes = Math.floor(secs / 60) || 0,
      seconds = Math.round(secs - minutes * 60) || 0;
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
} // Show current year on footer


current_year.textContent = new Date().getFullYear().toString(); // --------------------- Preloader  ---------------------
// $(window).on('load', function () {
//     $(".loader").fadeOut();
//     $('body').delay(2000).css('overflow', 'auto');
//     $("#loading").delay(100).fadeOut("slow");
// });
// window.addEventListener('load', (event) => {
//     console.log('loading');
// });
// document.addEventListener('DOMContentLoaded', (event) => {
//     console.log('done');
// });

if (festival_days && festival_hours && festival_minutes && festival_seconds) {
  var countDown = new Date('13 nov 2022 00:00:00').getTime(),
      count_down_interval = setInterval(function () {
    'use strict';

    var now = new Date().getTime(),
        distance = countDown - now,
        second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;
    festival_days.textContent = Math.floor(distance / day);
    festival_hours.textContent = Math.floor(distance % day / hour);
    festival_minutes.textContent = Math.floor(distance % hour / minute);
    festival_seconds.textContent = Math.floor(distance % minute / second); //Do something later when date is reached

    if (distance < 0) {
      // clearInterval(count_down_interval);
      countDown = new Date('13 nov 2025 00:00:00').getTime();
    }
  }, 1000);
}
//# sourceMappingURL=scripts.js.map
