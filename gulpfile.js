var
  gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  cssnext = require('gulp-cssnext'),
  cssnano = require('gulp-cssnano'),
  replace = require('gulp-replace'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify')
;

gulp.task('css-main', function () {
  return gulp.src('css/main.css')
    .pipe(cssnext())
    .pipe(autoprefixer({ cascade: false, browsers: 'last 2 versions' }))
    .pipe(replace(/svg\>/g, 'svg%3E'))
    .pipe(replace(/\<svg/g, '%3Csvg'))
    .pipe(replace(/\>\</g, '%3E%3C'))
    .pipe(replace(/='#/g, "='%23"))
    .pipe(gulp.dest('tmp'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('_includes'))
  ;
});

gulp.task('js-main', function () {
  return gulp.src(['js/rocket.js', 'js/link-colors.js'])
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('_includes'))
  ;
});

gulp.task('build-css', ['css-main'], function () {
  return gulp.src('_includes/main.min.css')
    .pipe(cssnano())
    .pipe(gulp.dest('_includes'))
  ;
});

gulp.task('build-js', ['js-main'], function () {
  return gulp.src('main.min.js')
    .pipe(uglify())
    .pipe(gulp.dest('_includes'))
});

gulp.task('build', ['build-css', 'build-js']);

gulp.task('watch', function() {
  gulp.watch('css/*.css', ['css-main']);
  gulp.watch('css/*.js', ['js-main']);
});

gulp.task('default', ['css-main', 'js-main']);
