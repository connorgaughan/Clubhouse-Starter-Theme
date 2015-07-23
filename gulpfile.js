var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    cache = require('gulp-cache'),
    watch = require('gulp-watch'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    sourcemaps = require('gulp-sourcemaps'),
    cmq = require('gulp-combine-media-queries'),

    input = {
      'styles':   './src/scss/**/*.scss',
      'scripts':  './src/js/*.js',
      'images':   './src/images'
    },

    output = {
      'styles':   './_assets/css',
      'scripts':  './_assets/js',
      'images':   './_assets'
    }

    watch = {
      'styles':   './src/scss/**/*.scss',
      'scripts':  './src/js/*.js',
      'images':   './src/images'
    };



gulp.task('styles', function () {
    return gulp.src(input.styles)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest(output.styles))
    .pipe(rename({suffix: '.min'}))
    .pipe(cmq({log: true}))
    .pipe(minifycss())
    .pipe(gulp.dest(output.styles))
});

gulp.task('scripts', function() {
    return gulp.src(input.scripts)
    .pipe(concat('main.js'))
    .pipe(gulp.dest(output.scripts))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(output.scripts))
});

gulp.task('images', function() {
    return gulp.src(input.images)
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest(output.images))
});

gulp.task('clean', function(cb) {
    del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img'], cb)
});

gulp.task('default', ['clean', 'watch'], function() {
    gulp.start('styles', 'scripts', 'images');
});

gulp.task('watch', function() {
  gulp.watch(watch.styles, ['styles']);
  gulp.watch(watch.scripts, ['scripts']);
  gulp.watch(watch.images, ['images']);

  livereload.listen();
  gulp.watch(['./_assets/**']).on('change', livereload.changed);
});