const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const watch = require('gulp-watch');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

//Sass
gulp.task('sass', () => {
    return gulp.src('src/scss/style.scss')
                .pipe(sourcemaps.init())
                .pipe(sass().on('error',sass.logError))
                .pipe(autoprefixer({
                    browsers: ['last 3 versions'],
                    cascade: false
                }))
                .pipe(sourcemaps.write())
                .pipe(gulp.dest('src/css'))
                .pipe(sourcemaps.init())
                .pipe(cssmin())
                .pipe(rename({suffix: '.min'}))
                .pipe(sourcemaps.write('./'))
                .pipe(gulp.dest('dist/styles'))
});

//Clean
gulp.task('clean', () => {
    return del(['./dist/styles','./src/css']);
});

//Default task
gulp.task('default', ['clean'],() => {
    gulp.start('sass');
});

//Watch
gulp.task('watch', () => {
    gulp.watch('src/scss/**/*.scss',['clean','sass']);
})
