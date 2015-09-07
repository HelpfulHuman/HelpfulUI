var gulp = require('gulp');
var del = require('del');
var browsersync = require('browser-sync');
var plugins = require('gulp-load-plugins')();


/**
 * CLEAN
 * Various clean tasks that remove un-needed code from each build.
 */
gulp.task('clean:styles', function (done) {
  del(['./all.css'], done);
});

/**
 * STYLES:COMPILE
 * Compile Stylus files, apply vendor prefixes and minify stylesheets.
 */
gulp.task('styles', ['clean:styles'], function () {
  return gulp.src('./index.styl')
    .pipe(plugins.plumber())
    .pipe(plugins.stylus())
    .pipe(gulp.dest('./'))
    .pipe(plugins.rename({ suffix: '.min' }))
    .pipe(plugins.minifyCss())
    .pipe(gulp.dest('./'));
});

/**
 * BUILD
 * Run all compilation tasks.
 */
gulp.task('build', ['styles']);

/**
 * WATCH
 * Automatically run tasks on file change.
 */
gulp.task('watch', ['build'], function () {
  gulp.watch('./**/*.styl', ['styles']).on('change', browsersync.reload);
  gulp.watch('./index.html', []).on('change', browsersync.reload);
});

/**
 * SERVER
 * Start a browser sync server for the project.
 */
gulp.task('serve', ['watch'], function () {
  browsersync.init({
    server: {
      baseDir: './'
    }
  });
});

/**
 * DEFAULT TASK
 */
gulp.task('default', ['watch']);
