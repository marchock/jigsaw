var src = "src/",
    dest = "dest/",
    // Modules
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    del = require("del");

// Default task
gulp.task('scripts', function() {
    gulp.start("js-scripts");
});


gulp.task('js-scripts', function() {
  return gulp.src([src + 'js/*.js', src + 'js/jigsaw/*.js'])
    .pipe(concat('jigsaw.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dest + "js/"));
});

// Clean - Deletes all the files before recompiling to ensure no unused files remain
gulp.task('clean', function(cb) {
    setTimeout(function () {
        del([dest], cb);
    }, 1000) 
    
});



