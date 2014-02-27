var gulp = require('gulp');
//var gutil = require('gulp-util');
var compass = require('gulp-compass');

gulp.task('default', function(){
  // place code for your default task here
});


gulp.task('compass', function() {
    gulp.src('scss/*.scss')
        .pipe(compass({
            //config_file: 'config.rb'
            css: 'css',
            sass: 'scss',
        }))
        .pipe(gulp.dest('css'));
});

// Watch
gulp.task('watch', function() {

    // Watch .scss files
    gulp.watch('scss/**/*.scss', ['compass']);

    // Watch .js files
    gulp.watch('js/**/*.js', ['scripts']);

    // Watch image files
    gulp.watch('img/**/*', ['images']);

    // Watch image files
    gulp.watch('fonts/**/*', ['fonts']);

});