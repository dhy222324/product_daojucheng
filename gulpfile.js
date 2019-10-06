let gulp = require('gulp');
let sass = require('gulp-sass');
let cssnano = require('gulp-cssnano');
let rename = require('gulp-rename');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');

gulp.task('sass',()=>{
    gulp.src('./src/sass/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(rename({suffix : '.min'}))
    .pipe(gulp.dest('./dist/css'));
})
gulp.task('jsmin',()=>{
    gulp.src('./src/js/*.js')
    .pipe(rename({suffix : '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
})

gulp.task('default',()=>{
    gulp.watch('./src/sass/*.scss',['sass']);
    gulp.watch('./src/js/*.js',['jsmin']);
})