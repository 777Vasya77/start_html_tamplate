'use strict';
var gulp 		 = require('gulp'),
	wiredep 	 = require('wiredep').stream,
	useref 		 = require('gulp-useref'),
	gulpif 		 = require('gulp-if'),
	uglify 		 = require('gulp-uglify'),
	cleanCss 	 = require('gulp-clean-css'),
	clean 		 = require('gulp-clean');


//==================CLEAN==================
gulp.task('clean', function () {
	return gulp.src('dist', {read: false})
		.pipe(clean());
});

//==================BUILD==================
gulp.task('build', ['clean'], function () {
	return gulp.src('app/*.html')
		.pipe(useref())
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulpif('*.css', cleanCss()))
		.pipe(gulp.dest('dist'));
});

//================BOWER================
gulp.task('bower', function () {
	gulp.src('./app/*.html')
		.pipe(wiredep({
			directory : 'app/bower_components'
		}))
		.pipe(gulp.dest('./app'));
});

//================WATCH================
gulp.task('watch', function() {
	gulp.watch('bower.json', ['bower']);
	//gulp.watch('./app/sass/**/*.scss', ['sass'])
});

//=========Перемешение наших локальных файлов в папку dist ===== //
gulp.task('assets', function() {
	return gulp.src('./app/assets/**/*.*')
		.pipe(gulp.dest('./dist/assets'));
});
