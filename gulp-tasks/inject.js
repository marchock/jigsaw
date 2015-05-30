var gulp = require('gulp'),
    inject = require('gulp-inject'),
    util = require('util');


gulp.task('inject-src', function() {
    gulp.start("inject-script-src");
});


// Injects all script tags to page
gulp.task('inject-script-src', function () {
  var path = "src/";
  var target = gulp.src(path + '*.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths: 
  var sources = gulp.src([path + 'js/**/*.js'], {read: false});
 
  return target.pipe(
        inject(sources,
            {
                ignorePath: path + '',
                addRootSlash: false
            }))
    .pipe(gulp.dest(path));

});

// Injects all script tags to page
gulp.task('inject-script-dest', function () {

  var path = "dest/";

  setTimeout (function () {

    var target = gulp.src(path + '*.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths: 
    var sources = gulp.src([path + 'js/*.js'], {read: false});

    return target.pipe(
          inject(sources,
              {
                  ignorePath: path + '',
                  addRootSlash: false
              }))
      .pipe(gulp.dest(path));

  }, 3000);
});

