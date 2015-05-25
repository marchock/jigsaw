var gulp = require('gulp'),
    util = require('util'),
    requireDir = require('require-dir');

requireDir('./gulp-tasks');

// Default task
gulp.task('default', ['inject-src', 'clean'], function() {
    gulp.start("scripts", "copy", "inject-script-dest");
    util.log('default task executed.');
});
