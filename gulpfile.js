// Dependencies
var gulp = require('gulp'),
    path = require('path');


// Sync
gulp.task('sync', function () {

    var stylesdest = 'public/stylesheets/vendor';
    var fontdest = 'public/stylesheets/fonts';
    var scriptsdest = 'public/javascripts/vendor';

    //Jquery
    gulp.src(['node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest(scriptsdest))
    ;

    // Bootstrap
    gulp.src(['node_modules/bootstrap/dist/css/bootstrap.min.css'])
        .pipe(gulp.dest(stylesdest))
    ;
    gulp.src(['node_modules/bootstrap/dist/fonts/*'])
        .pipe(gulp.dest(fontdest))
    ;
    gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js'])
        .pipe(gulp.dest(scriptsdest))
    ;

    // Bootstrap theme
    gulp.src(['node_modules/bootstrap-material-design/dist/css/bootstrap-material-design.min.css'])
        .pipe(gulp.dest(stylesdest))
    ;
    gulp.src(['node_modules/bootstrap-material-design/dist/css/ripples.min.css'])
        .pipe(gulp.dest(stylesdest))
    ;
    gulp.src(['node_modules/bootstrap-material-design/dist/js/material.min.js'])
        .pipe(gulp.dest(scriptsdest))
    ;
    gulp.src(['node_modules/bootstrap-material-design/dist/js/ripples.min.js'])
        .pipe(gulp.dest(scriptsdest))
    ;

});
