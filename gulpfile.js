/**
 * Created by mitch on 2/20/2014.
 */
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var bower = require('gulp-bower');
var nodemon = require('nodemon');

gulp.task('build', function() {
   bower()
      .pipe(gulp.dest('dist/bower_components/'));
   gulp.src('app/**/*.js')
      .pipe(uglify())
      .pipe(gulp.dest('dist'));

   gulp.src('app/styles/*.css')
      .pipe(minifyCSS())
      .pipe(gulp.dest('dist/styles'));
   gulp.src('app/**/*.html')
      .pipe(gulp.dest('dist/'));
   gulp.src('app/fonts/*')
      .pipe(gulp.dest('dist/fonts'));
   gulp.src('app/images/*')
      .pipe(gulp.dest('dist/images'));
});

gulp.task('dev', function () {
   nodemon({
      script: 'main.js',
      env: {
         "DEBUG": true
      }
   })
});