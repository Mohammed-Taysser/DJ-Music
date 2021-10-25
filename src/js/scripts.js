
// Needed variables
const close_button = document.getElementById('js-menu-toggle'),
    menu_links = document.querySelector('#main-links ul'),
    array_of_slider_id = ['js-up-coming-events'],
    glide_slider_options = {
        type: 'carousel',
        perView: 3,
        autoplay: 5000,
        breakpoints: {
            992: {
                perView: 2,
            },
            768: {
                perView: 2,
            },
            567: {
                perView: 1,
            },
        },
    },
    current_year = document.getElementById('js-current-year'),
    header_angle_down = document.querySelector('header .angle-down '),
    hero_header_index_page = document.getElementById('js-header');

// Toggle menu on navbar

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


document.addEventListener('click', event => {
    'use strict';
    const event_condition = event.target !== menu_links
        && event.target !== close_button
        && menu_links.classList.contains('open');

    if (event_condition) {
        menu_links.classList.toggle('open');
        close_button.classList.toggle('open');
    }
});


if (header_angle_down) {
    header_angle_down.onclick = function () {
        'use strict';
        document.querySelector('#js-up-coming-events').scrollIntoView({
            behavior: 'smooth',
        });
    };
}

// Glide slider

array_of_slider_id.forEach(slider_id => {
    'use strict';
    const temp = document.getElementById(slider_id);
    if (temp) {
        new Glide(temp, glide_slider_options).mount();
    }
});

function setWindowHeight() {
    'use strict';
    const window_height = window.innerHeight,
        nav_height = document.querySelector('nav').clientHeight;
    hero_header_index_page.style.height = `${window_height - nav_height}px`;
}

if(hero_header_index_page){
    window.addEventListener('resize', setWindowHeight, false);
    setWindowHeight();
}


// Show current year on footer
current_year.textContent = new Date().getFullYear().toString();

// --------------------- Preloader  ---------------------

// $(window).on('load', function () {
//     $(".loader").fadeOut();
//     $('body').delay(2000).css('overflow', 'auto');
//     $("#loading").delay(100).fadeOut("slow");
// });

window.addEventListener('load', (event) => {
    console.log('loading');
});

document.addEventListener('DOMContentLoaded', (event) => {
   console.log('done');
});

// const second = 1000,
//     minute = second * 60,
//     hour = minute * 60,
//     day = hour * 24;
// let countDown = new Date('13 nov 2022 00:00:00').getTime(),
//     x = setInterval(function () {
//         'use strict';
//         let now = new Date().getTime(),
//             distance = countDown - now;
//         document.getElementById('days').textContent = Math.floor(distance / (day)),
//             document.getElementById('hours').textContent = Math.floor((distance % (day)) / (hour)),
//             document.getElementById('minutes').textContent = Math.floor((distance % (hour)) / (minute)),
//             document.getElementById('seconds').textContent = Math.floor((distance % (minute)) / second);

//         //do something later when date is reached
//         if (distance < 0) {
//             clearInterval(x);
//             //'IT'S MY BIRTHDAY!;
//         }
//     }, second);
