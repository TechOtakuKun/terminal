/**
 * Created by Administrator on 2016/8/15.
 */
var gulp = require('gulp');

//引入组件
var processhtml = require('gulp-processhtml'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    livereload = require('gulp-livereload'),

    concat = require('gulp-concat'), //文件合并
    rename = require('gulp-rename'), //文件更名
    uglify = require('gulp-uglify'); //前缀自动补全

var config = {
    originHTML: 'view',
    destHTML: 'dist',
    originStyle: 'public/style',
    originScript: 'public/script',
    destStyle: 'dist/css',
    destScript: 'dist/js'
};

// html
gulp.task('html', function() {
    return gulp.src(config.originHTML + '/*.html')
        .pipe(processhtml())
        .pipe(gulp.dest(config.destHTML + '/'));
});

//css
gulp.task('style', function() {
    return gulp.src(config.originStyle + '/*.less')
        .pipe(less())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest(config.destStyle))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss())
        .pipe(gulp.dest(config.destStyle));
});

// js
gulp.task('script', function() {
    return gulp.src(config.originScript + '/*.js')
        .pipe(gulp.dest(config.destScript))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest(config.destScript));
});

// Default task
gulp.task('default', function() {
    gulp.start('html', 'style', 'script');
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(config.originStyle + '/*.less', ['style']);
    gulp.watch(config.originScript + '/*.js', ['script']);
    gulp.watch(config.destStyle + '/*.*', function(file) {
        livereload.changed(file.path);
    })
});