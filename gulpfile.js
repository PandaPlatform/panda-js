(function () {
    'use strict';

    // Set library version
    var version = '1.5.4';

    // Initialize variables
    var gulp = require('gulp');
    var del = require('del');
    var uglify = require('gulp-uglify');
    var concat = require('gulp-concat');
    var rename = require('gulp-rename');

    // Initialize Panda Libraries
    var panda = [
        // Panda
        'src/Panda.js',

        // Panda Registry
        'src/panda/Registry.js',

        // Base packages
        'src/panda/*.js',

        // Debug package
        'src/panda/debug/*.js',

        // Environment package
        'src/panda/env/*.js',

        // Events package
        'src/panda/events/*.js',

        // Helpers package
        'src/panda/helpers/*.js',

        // Http package
        'src/panda/http/*.js',
        'src/panda/http/Jar/*.js',

        // Main files
        'src/Init.js'
    ];

    // Set default gulp task
    gulp.task('default', ['build']);

    // Compress files task
    gulp.task('build', ['minify']);

    // Minify files
    gulp.task('minify', ['concat', 'concat-with-jq'], function () {
        return gulp.src(['./dist/*.js'])
            .pipe(uglify())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest('./dist/'));
    });

    // Concat source files
    gulp.task('concat', function () {
        // Clean files
        del('./dist/*');

        // build without jQuery
        return gulp.src(panda)
            .pipe(concat('panda-' + version + '.js'))
            .pipe(gulp.dest('./dist/'));
    });

    // Concat source files
    gulp.task('concat-with-jq', function () {
        // Clean files
        del('./dist/*');

        // build with jQuery
        return gulp.src(['src/jquery/*.js'].concat(panda))
            .pipe(concat('panda-' + version + '.jq.js'))
            .pipe(gulp.dest('./dist/'));
    });
}());
