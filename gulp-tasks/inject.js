var gulp = require('gulp'),
    inject = require('gulp-inject'),
    util = require('util');


gulp.task('inject-src', function() {
    gulp.start("inject-script-src", "inject-script-src-jquery");
});


// Injects all script tags to page
gulp.task('inject-script-src', function () {
  var path = "src/";
  var target = gulp.src(path + 'vanilla/*.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths: 
  var sources = gulp.src([path + 'vanilla/js/**/*.js'], {read: false});
 
  return target.pipe(
        inject(sources,
            {
                ignorePath: path + 'vanilla/',
                addRootSlash: false
            }))
    .pipe(gulp.dest(path + 'vanilla'));

});

// Injects all script tags to page
gulp.task('inject-script-dest', function () {

  var path = "dest/";

  setTimeout (function () {

    var target = gulp.src(path + 'vanilla/*.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths: 
    var sources = gulp.src([path + 'vanilla/js/*.js'], {read: false});

    return target.pipe(
          inject(sources,
              {
                  ignorePath: path + 'vanilla/',
                  addRootSlash: false
              }))
      .pipe(gulp.dest(path + 'vanilla'));

  }, 3000);
});


/* JQUERY */
gulp.task('inject-script-src-jquery', function () {
  var path = "src/";
  var target = gulp.src(path + 'jquery/*.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths: 
  var sources = gulp.src([path + 'jquery/js/*.js'], {read: false});
 
  return target.pipe(
        inject(sources,
            {
                ignorePath: path + 'jquery/',
                addRootSlash: false
            }))
    .pipe(gulp.dest(path + 'jquery'));

});
