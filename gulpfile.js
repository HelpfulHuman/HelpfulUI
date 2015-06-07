var gulp = require('gulp')
  , del = require('del')
  , rename = require('gulp-rename')
  , plumber = require('gulp-plumber')
  , stylus = require('gulp-stylus')
  , autoprefix = require('gulp-autoprefixer')
  , minifyCss = require('gulp-minify-css')


/**
 * CLEAN
 * Various clean tasks that remove un-needed code from each build.
 */
gulp.task('clean:styles', function (done) {
  del(['./all.css'], done)
})

/**
 * STYLES:COMPILE
 * Compile Stylus files, apply vendor prefixes and minify stylesheets.
 */
gulp.task('styles', ['clean:styles'], function () {
  return gulp.src('./all.styl')
    .pipe(plumber())
    .pipe(stylus())
    .pipe(autoprefix())
    .pipe(gulp.dest('./'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifyCss())
    .pipe(gulp.dest('./'))
})

/**
 * BUILD
 * Run all compilation tasks.
 */
gulp.task('build', ['styles'])

/**
 * WATCH
 * Automatically run tasks on file change.
 */
gulp.task('watch', ['build'], function () {
  gulp.watch('./**/*.styl', ['styles'])
})

/**
 * DEFAULT TASK
 */
gulp.task('default', ['watch'])
