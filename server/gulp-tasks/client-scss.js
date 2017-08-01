let gulp = require('gulp');
let sass = require('gulp-sass');
let sourcemaps = require('gulp-sourcemaps');

const scss = {
    src: './client/sass/**/*.scss',
    dest: '../client/static/css'
};

gulp.task('sass', () =>{
    return gulp.src(scss.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(scss.dest));
});

gulp.task('sass:watch', ['sass'], () => {
    gulp.watch(scss.src, ['sass']);
});