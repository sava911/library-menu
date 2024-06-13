'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "app/"
    },
    notify: false

  });
}
function buildStyles() {
  return gulp.src('app/sass/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 version'],
      grid: true
    }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.stream());
}

function scripts() {
  return gulp.src([
    'node_modules/jquery/dist/jquery.js',
    'app/js/main.js'
  ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.stream());

}

function build() {
  return gulp.src([
    "app/**/*.html",
    "app/css/style.min.css",
    "app/js/main.min.js",
  ], {base: 'app'})
    .pipe(gulp.dest('dist'))
}


function watching() {
  gulp.watch('app/sass/**/*.scss', buildStyles);
  gulp.watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
  gulp.watch("app/**/*.html").on('change', browserSync.reload);
};

exports.buildStyles = buildStyles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;
exports.build = gulp.series(build);

exports.default = gulp.parallel(buildStyles, scripts, browsersync, watching)