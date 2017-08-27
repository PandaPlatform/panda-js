(function () {
    'use strict';

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

        // Base packages
        'src/Panda/*.js',

        // Debug package
        'src/Panda/Debug/*.js',

        // Environment package
        'src/Panda/Env/*.js',

        // Events package
        'src/Panda/Events/*.js',

        // Helpers package
        'src/Panda/Helpers/*.js',

        // Http package
        'src/Panda/Http/*.js',
        'src/Panda/Http/Jar/*.js',

        // Main files
        'src/Init.js'
    ];
    var version = '1.2.1';

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
        return gulp.src(['src/jquery/jquery-2.2.4.js'].concat(panda))
            .pipe(concat('panda-' + version + '.jq.js'))
            .pipe(gulp.dest('./dist/'));
    });
}());
