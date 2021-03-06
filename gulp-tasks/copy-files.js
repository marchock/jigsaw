var src = "src/",
    dest = "dest/",
    // Modules
    gulp = require('gulp');


// Default task
gulp.task('copy', function() {
    gulp.start("copy-html", "copy-css", "copy-data", 'copy-prism');
});

gulp.task('copy-html', function() {
    return gulp.src(src + '*.html')
      .pipe(gulp.dest(dest));
});

gulp.task('copy-css', function() {
    return gulp.src(src + 'css/*.css')
      .pipe(gulp.dest(dest + 'css'));
});

gulp.task('copy-data', function() {
    return gulp.src(src + 'data/**/*')
      .pipe(gulp.dest(dest + 'data'));
});

gulp.task('copy-prism', function() {
    return gulp.src(src + 'lib/prism.js')
      .pipe(gulp.dest(dest + 'lib'));
});