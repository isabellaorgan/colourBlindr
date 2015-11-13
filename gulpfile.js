'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
//var expect = require('chai').expect;
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var stylish = require('gulp-jscs-stylish');
var appFiles = ['./lib/**/*.js'];
var testFiles = ['./test/**/*.js'];

gulp.task('jshint:test', function() {
	return gulp.src(testFiles)
		.pipe(jshint({
				node: true,
				globals: {
					describe: true,
					it: true,
					before: true,
					after: true
				}
		}))
		.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('jshint:app', function() {
	return gulp.src(appFiles)
	.pipe(jshint({
		node: true
	}))
	.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('jscs', function() {
	return gulp.src(appFiles)
	.pipe(jscs())
	.pipe(stylish());
});

gulp.task('mocha:test', function () {
	return gulp.src(testFiles)
	.pipe(mocha({
		reporter: 'spec'}));
});

gulp.task('jshint', ['jshint:test', 'jshint:app']);
gulp.task('mocha', ['mocha:test']);
gulp.task('default', ['jscs', 'jshint', 'mocha:test']);
