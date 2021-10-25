const gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    babel = require('gulp-babel'),

    //C concat = require('gulp-concat'),
    del = require('del'),
    pug = require('gulp-pug'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass')(require('sass')),
    uglify = require('gulp-uglify'),
    paths = {
        html: {
            src: 'src/html/pages/*.pug',
            dest: 'dist/html',
        },
        scss: {
            src: 'src/css/*.scss',
            dest: 'dist/css/',
        },
        javascript: {
            libs: 'src/js/libs/*.js',
            build: {
                src: 'src/js/*.js',
                dest: 'dist/javascript/build/',
            },
            demo: {
                src: 'src/js/*.js',
                dest: 'dist/javascript/',
            },
        },
        fonts: {
            src: 'src/fonts/**',
            dest: 'dist/fonts/',
        },
        images: {
            src: 'src/images/**',
            dest: 'dist/images/',
        },
        music: {
            src: 'src/music/**',
            dest: 'dist/music/',
        },
    };
function clean() {
    'use strict';
    return del([
        'dist/**', '!dist',
    ]);
}


function scss_task() {
    'use strict';
    return gulp.src(paths.scss.src)
        .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename(function (path) {path.extname = '.min.css';}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.scss.dest));
}

// function demo_scss_task() {
//     'use strict';
//     return gulp.src(paths.scss.src)
//         .pipe(sourcemaps.init())
//         .pipe(autoprefixer())
//         .pipe(sass().on('error', sass.logError))
//         .pipe(rename(function (path) {path.extname = '.css';}))
//         .pipe(sourcemaps.write('.'))
//         .pipe(gulp.dest(paths.scss.dest));
// }

function html_task() {
    'use strict';
    require('./server.js');
    return gulp.src(paths.html.src)
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest(paths.html.dest));
}

function fonts_task() {
    'use strict';
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest));
}

// function demo_js_task() {
//     'use strict';
//     return gulp.src(paths.javascript.demo.src)
//         .pipe(sourcemaps.init())
//         .pipe(babel({ presets: ['@babel/env'] }))

//         // .pipe(concat('script.js'))
//         .pipe(rename(function (path) {
//             if (path.basename.slice(-3) === 'min'){
//                 path.basename = path.basename.slice(0, -4);
//             }
//         }))
//         .pipe(sourcemaps.write('.'))
//         .pipe(gulp.dest(paths.javascript.demo.dest));
// }
function build_js_task() {
    'use strict';
    return gulp.src(paths.javascript.build.src)
        .pipe(sourcemaps.init())
        .pipe(babel({ presets: ['@babel/env'] }))

        // .pipe(concat('scripts.min.js'))
        .pipe(rename(function (path) {
            if (path.basename.slice(-3) !== 'min') {
                path.extname = '.min.js';
            }
        }))

        // .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.javascript.build.dest));
}
function build_libs_js_task() {
    'use strict';
    return gulp.src(paths.javascript.libs)
        .pipe(sourcemaps.init())
        .pipe(rename(function (path) {
            if (path.basename.slice(-3) !== 'min') {
                path.extname = '.min.js';
            }
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.javascript.build.dest));
}

function images_task() {
    'use strict';
    return gulp.src(paths.images.src)
        .pipe(gulp.dest(paths.images.dest));
}

function music_task() {
    'use strict';
    return gulp.src(paths.music.src)
        .pipe(gulp.dest(paths.music.dest));
}

function watch_fun() {
    'use strict';
    gulp.watch('src/html/**/*.pug', html_task);
    // gulp.watch(paths.javascript.demo.src, demo_js_task);
    gulp.watch('src/js/**/*.js', build_js_task);
    gulp.watch('src/js/**/*.js', build_libs_js_task);
    gulp.watch(paths.fonts.src, fonts_task);
    gulp.watch('src/css/**/*.scss', scss_task);
    // gulp.watch(paths.scss.src, demo_scss_task);
    gulp.watch(paths.images.src, images_task);
    gulp.watch(paths.music.src, music_task);
}


exports.default = gulp.series(clean,
    html_task,
    build_js_task,
    build_libs_js_task,
    // demo_js_task,
    fonts_task,
    images_task,
    scss_task,
    music_task,
    // demo_scss_task,
    gulp.parallel(watch_fun),
);
