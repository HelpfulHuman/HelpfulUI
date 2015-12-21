var gulp = require('gulp');
var del = require('del');
var browsersync = require('browser-sync');
var plugins = require('gulp-load-plugins')();
var notifierReporter = require('mocha-notifier-reporter');

/**
 * TEST
 * Runs all assertion tests for each of the render cases.
 */
gulp.task('test', function () {
  return gulp
    .src('test/runner.js', {read: false})
    .pipe(plugins.mocha({
      reporter: notifierReporter.decorate('spec'),
      ignoreLeaks: true,
      growl: true
    }));
});

/**
 * TDD
 * Run tests upon relevant file changes.
 */
gulp.task('tdd', function () {
  gulp.watch(['./helpful-ui/**/*', './test/cases/**/*'], ['test']);
});

/**
 * DEFAULT TASK
 */
gulp.task('default', ['tdd']);
