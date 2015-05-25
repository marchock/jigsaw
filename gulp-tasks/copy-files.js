var src = "src/",
    dest = "dest/",
    // Modules
    gulp = require('gulp');


// Default task
gulp.task('copy', function() {
    gulp.start("copy-html", 'copy-html-jquery', "copy-css", "copy-data");
});

gulp.task('copy-html', function() {
    return gulp.src(src + 'vanilla/*.html')
      .pipe(gulp.dest(dest + 'vanilla/'));
});

gulp.task('copy-html-jquery', function() {
    return gulp.src(src + 'jquery/*.html')
      .pipe(gulp.dest(dest + 'jquery/'));
});

gulp.task('copy-css', function() {
    return gulp.src(src + 'css/*.css')
      .pipe(gulp.dest(dest + 'css'));
});

gulp.task('copy-data', function() {
    return gulp.src(src + 'data/**/*')
      .pipe(gulp.dest(dest + 'data'));
});