var src = "src/",
    dest = "dest/",
    // Modules
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    del = require("del");

// Default task
gulp.task('scripts', function() {
    gulp.start("scripts-vanilla", "scripts-jquery");
});

gulp.task('scripts-jquery', function() {
  return gulp.src([src + 'jquery/js/*.js'])
    .pipe(concat('jigsaw.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dest + "jquery/js/"));
});

gulp.task('scripts-vanilla', function() {
  return gulp.src([src + 'vanilla/js/*.js', src + 'vanilla/js/jigsaw/*.js'])
    .pipe(concat('jigsaw.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dest + "vanilla/js/"));
});

// Clean - Deletes all the files before recompiling to ensure no unused files remain
gulp.task('clean', function(cb) {
    setTimeout(function () {
        del([dest], cb);
    }, 1000) 
    
});



