let gulp = require('gulp');
let browserify = require('gulp-browserify');
let sourcemaps = require('gulp-sourcemaps');

const js = {
    main: 'client/ts/app.js',
    src: 'client/ts/**/*.js',
    dest: 'public/js'
};

// Browserify
gulp.task('browserify', function() {
    return gulp.src(js.main)
        .pipe(browserify({
            insertGlobals: true
        }))
        .on('error', () => {})
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(js.dest));
});

gulp.task('browserify:watch', ['browserify'], function() {
    gulp.watch(js.src, ['browserify']);
});