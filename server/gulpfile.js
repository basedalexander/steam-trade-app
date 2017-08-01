let gulp = require('gulp');
let requireDir = require('require-dir');
let ts = require('gulp-typescript');
let sourcemaps = require('gulp-sourcemaps');
let merge = require('merge2');

requireDir('./gulp-tasks');

gulp.task('css', ['sass:watch']);
gulp.task('js', ['browserify:watch']);

gulp.task('ts-compile', ['ts-compile-client', 'ts-compile-server'], function() { });

gulp.task('ts-compile-client', () => {
    return compile('../client', '../client/tsconfig.json');
});

gulp.task('ts-compile-server', () => {
    return compile('./', './tsconfig.json');
});

function compile(compileFolder, tsConfigPath) {
    var tsProject = ts.createProject(tsConfigPath, {
        typescript: require('typescript')
    });

    var tsResult = tsProject
        .src()
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject));

    return merge([
        tsResult.js
            .pipe(sourcemaps.write(compileFolder))
            .pipe(gulp.dest(compileFolder)),

        tsResult.dts.pipe(gulp.dest(compileFolder))
    ]);
}