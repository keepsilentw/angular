'use strict';

var gulp = require('gulp');

gulp.task('clean', function () {
  var rimraf = require('gulp-rimraf');
  return gulp.src('dist', {read: false}).pipe(rimraf());
});

gulp.task('template', function () {
  var templateCache = require('gulp-angular-templatecache');
  return gulp.src(['src/modules/**/*.html', 'src/directive/**/*.html'])
    .pipe(templateCache({module: 'app'}))
    .pipe(gulp.dest('src/modules'));
});

gulp.task('sass', function () {
  var sass = require('gulp-sass');
  return gulp.src('src/assets/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/assets/css'));
});

gulp.task('watch', function () {
  gulp.watch(['src/modules/**/*.html', 'src/directive/**/*.html'], ['template']);
  gulp.watch('src/assets/scss/*.scss', ['sass']);
});

gulp.task('usemin', function () {
  var concat = require('gulp-concat'),
    csso = require('gulp-csso'),
    rev = require('gulp-rev'),
    usemin = require('gulp-usemin'),
    uglify = require('gulp-uglify');
  return gulp.src('src/index.html').pipe(usemin({
    'libcss': [concat('assets/css/lib.css'), csso(), rev()],
    'libjs': [concat('js/lib.js'), uglify(), rev()],
    'appcss': [concat('assets/css/app.css'), csso(), rev()],
    'appjs': [concat('js/app.js'), uglify(), rev()]
  })).pipe(gulp.dest('dist'));
});

gulp.task('copy', function () {
  gulp.src('src/assets/img/*').pipe(gulp.dest('dist/assets/img'));
  gulp.src(['src/vendor/bootstrap/fonts/*', 'src/vendor/font-awesome/fonts/*'])
  .pipe(gulp.dest('dist/assets/fonts'));
});

gulp.task('server', function () {
  var connect = require('gulp-connect');
  return connect.server({livereload: true, root: 'src', port: 4000});
});

gulp.task('open', function () {
  var open = require('gulp-open');
  return gulp.src('./src/index.html')
    .pipe(open({uri: 'http://localhost:4000'}));
});

var sequence = require('run-sequence');

gulp.task('start', function () {
  sequence('template', 'sass', 'watch', 'server', function () {
    gulp.start('open');
  })
})

gulp.task('build', ['clean'], function () {
  sequence('template', 'sass', function () {
    gulp.start('copy', 'usemin');
  })
});

gulp.task('default', ['clean']);
