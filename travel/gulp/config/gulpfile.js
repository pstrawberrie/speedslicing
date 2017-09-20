var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    less = require('gulp-less'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel');

// LESS
gulp.task('less', function () {
  return gulp.src('../styles/styles.less')
    .pipe(less().on('error', function (err) {
      console.log(err);
    }))
    .pipe(cssmin().on('error', function(err) {
      console.log(err);
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('../styles'))
    .pipe(browserSync.stream());
});

// JS
gulp.task('js', function() {
	return gulp.src('../scripts/app.js')
		.pipe(babel({
			presets: ['env']
		}))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('../scripts'));
});

// Serve
gulp.task('serve', ['less', 'js'], function() {
  browserSync.init({
      server: "../",
      notify: false,
      open: false,
      logLevel: "silent"
  });
  gulp.watch('../styles/**/*.less', ['less']);
  gulp.watch('../scripts/**/*.js', ['js', reload]);
  gulp.watch("../*.html").on('change', browserSync.reload);
});


gulp.task('default', ['serve']);
