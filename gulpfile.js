var gulp = require('gulp');
// var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
//var gutil = require('gulp-util');

gulp.task('default', function(){
  // place code for your default task here
});


// Watch
// gulp.task('watch', function() {

//     // Watch .js files
//     gulp.watch('js/**/*.js', ['scripts']);


// });


// gulp.task('clean', function () {  
//   return gulp.src('js', {read: false})
//     .pipe(clean());
// });



gulp.task('compress', function() {
  gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
});