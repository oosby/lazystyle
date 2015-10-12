var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var through2 = require('through2');
var uglify = require('gulp-uglify');

gulp.task('build', function () {
    return gulp.src('./src/*.js')
        .pipe(through2.obj(function (file, enc, next) {
            browserify(file.path, { debug: process.env.NODE_ENV === 'development' })
                .transform(require('babelify'))
                .bundle(function (err, res) {
                    if (err) { return next(err); }

                    file.contents = res;
                    next(null, file);
                });
        }))
        .on('error', function (error) {
            console.log(error.stack);
            this.emit('end');
        })
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['build']);

