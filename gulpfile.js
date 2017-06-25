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
        'src/Panda/Panda.js',

        // Debug package
        'src/Panda/Debug.js',
        'src/Panda/Debug/Debugger.js',
        'src/Panda/Debug/Logger.js',

        // Environment package
        'src/Panda/Env.js',
        'src/Panda/Env/Cookies.js',
        'src/Panda/Env/State.js',
        'src/Panda/Env/Storage.js',
        'src/Panda/Env/Url.js',

        // Events package
        'src/Panda/Events.js',
        'src/Panda/Events/Library.js',

        // Helpers package
        'src/Panda/Helpers/Date.js',

        // Http package
        'src/Panda/Http.js',
        'src/Panda/Http/Async.js',
        'src/Panda/Http/Jar.js',
        'src/Panda/Http/Jar/JSONAsync.js',
        'src/Panda/Http/Jar/HTMLAsync.js',
        'src/Panda/Http/Jar/FormAsync.js',

        // Main files
        'src/Panda/Init.js'
    ];
    var version = 1.2;

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
        return gulp.src(panda)
            .pipe(concat('panda-' + version + '.js'))
            .pipe(gulp.dest('./dist/'));
    });

    // Concat source files
    gulp.task('concat-with-jq', function () {
        // Clean files
        del('./dist/*');

        // v1.1 (with jQuery)
        return gulp.src(['src/jquery/jquery-2.2.4.js'].concat(panda))
            .pipe(concat('panda-' + version + '.jq.js'))
            .pipe(gulp.dest('./dist/'));
    });
}());
