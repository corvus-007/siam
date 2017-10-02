var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync').create();
var mqpacker = require('css-mqpacker');
var minify = require('gulp-csso');
var sourcemaps = require('gulp-sourcemaps');
var fileinclude = require('gulp-file-include');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var run = require('run-sequence');
var del = require('del');


gulp.task('style', function () {
  return gulp.src('app/css/**/*.css')
    .pipe(plumber({
      errorHandler: function (err) {
        console.log(err);
      }
    }))
    .pipe(postcss([
      autoprefixer({
        browsers: [
          'last 2 version'
        ]
      }),
      mqpacker({
        sort: true
      })
    ]))
    // .pipe(minify())
    .pipe(gulp.dest('build/css/'))
    .pipe(browserSync.stream());
});

gulp.task('copy-script', function () {
  gulp.src(['app/js/*.{js,json}'])
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.stream());
});

gulp.task('fileinclude', function () {
  gulp.src('app/*.html')
    .pipe(fileinclude({
      indent: true
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('images', function () {
  return gulp.src(['app/images/**/*', 'app/img/**/*', 'app/attachments/**/*'])
    .pipe(gulp.dest('build'));
});


gulp.task('clean', function () {
  return del('build');
});

gulp.task('copy', function () {
  return gulp.src([
      'app/css/fonts/**/*.{woff,woff2}',
      'app/images/**/*',
      'app/img/**/*',
      'app/attachments/**/*',
      // 'app/js/**/*',
      'app/*.html'
    ], {
      base: 'app',
      allowEmpty: true
    })
    .pipe(gulp.dest('build'));
});

gulp.task('build', function (fn) {
  run(
    'clean',
    'copy',
    'style',
    'copy-script',
    'fileinclude',
    'images',
    fn);
});

gulp.task('serve', function () {
  browserSync.init({
    server: "./build"
  });

  gulp.watch('app/css/**/*', function () {
    setTimeout(function () {
      gulp.start('style');
    }, 500);
  });

  gulp.watch('app/js/**/*', ['copy-script']);
  gulp.watch(['app/*.html', 'app/blocks/**/*.html'], ['fileinclude']).on('change', browserSync.reload);
});
