var gulp = require('gulp');
var sass = require('gulp-ruby-sass');

gulp.task('scss', function () {
  return gulp.src('scss/*')
    .pipe(sass({sourcemap: true, sourcemapPath: 'scss/*'}))
    .on('error', function (err) { console.log(err.message); })
    .pipe(gulp.dest('dist/'));
});