var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	autoprefixer = require('gulp-autoprefixer'),
	cleanCSS = require('gulp-clean-css'),
	rename = require("gulp-rename");
	//imagemin = require('gulp-imagemin');
	//order = require("gulp-order");

var paths = {
  scripts :[
	  './assets/js/jquery-2.1.1.min.js',
	  './assets/js/jquery.validate.min.js',
	  './assets/js/moment.js',
	  './assets/js/materialize.js',
	  './assets/js/scripts.js'
  ],
  styles :[
  	'./assets/css/materialize.min.css',
  	'./assets/css/styles.css'
  ],
  images : 'assets/img/**/*'
};

/*
* Configuración de las tareas 'para minificar'
*/

gulp.task('scripts', function () {
	gulp.src(paths.scripts)
		.pipe(concat('scripts.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('public/javascripts/'));
});

gulp.task('styles', function () {
	gulp.src(paths.styles)
		.pipe(autoprefixer())
		.pipe(cleanCSS())
		.pipe(concat('styles.min.css'))
		.pipe(gulp.dest('public/stylesheets/'));
});

/*/ Copy all static images
gulp.task('images', function() {
  gulp.src(paths.images)
    // Pass in options to the task
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('public/img'));
});
*/
gulp.task('watch', function () {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.styles, ['styles']);
});

gulp.task('default', ['scripts','styles','watch']);
