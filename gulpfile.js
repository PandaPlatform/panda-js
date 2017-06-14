'use strict';

(function () {
    // Initialize variables
    var gulp = require('gulp');
    var del = require('del');
    var uglify = require('gulp-uglify');
    var concat = require('gulp-concat');
    var rename = require('gulp-rename');

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

        // v1.1 (without jQuery)
        return gulp.src([
            // Panda
            'src/panda/Panda.js',

            // Debug module
            'src/panda/debug/Debug.js',
            'src/panda/debug/Logger.js',

            // Environment module
            'src/panda/env/Cookies.js',
            'src/panda/env/State.js',
            'src/panda/env/Storage.js',
            'src/panda/env/Url.js',

            // Events module
            'src/panda/events/Library.js',

            // Helpers module
            'src/panda/helpers/Date.js',

            // Http module
            'src/panda/http/Async.js',

            // Main files
            'src/panda/Events.js',
            'src/panda/Init.js'
        ])
            .pipe(concat('panda-1.1.js'))
            .pipe(gulp.dest('./dist/'));
    });

    // Concat source files
    gulp.task('concat-with-jq', function () {
        // Clean files
        del('./dist/*');

        // v1.1 (without jQuery)
        return gulp.src([
            // jQuery
            'src/jquery/jquery-2.2.4.js',

            // Panda
            'src/panda/Panda.js',

            // Debug module
            'src/panda/debug/Debug.js',
            'src/panda/debug/Logger.js',

            // Environment module
            'src/panda/env/Cookies.js',
            'src/panda/env/State.js',
            'src/panda/env/Storage.js',
            'src/panda/env/Url.js',

            // Events module
            'src/panda/events/Library.js',

            // Helpers module
            'src/panda/helpers/Date.js',

            // Http module
            'src/panda/http/Async.js',

            // Main files
            'src/panda/Events.js',
            'src/panda/Init.js'
        ])
            .pipe(concat('panda-1.1.jq.js'))
            .pipe(gulp.dest('./dist/'));
    });
}());
