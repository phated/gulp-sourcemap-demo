const gulp = require('gulp');
const gulpBabel = require('gulp-babel');
const gulpGzip = require('gulp-gzip');
const pump = require('pump');

gulp.task('default', () => {
	// I'd highly recommend using `require('stream').pipeline`
	// because pump doesn't error correctly on the returned stream
	return pump(
		gulp.src('src/**', {sourcemaps: true}),
		gulpBabel({
			presets: ['minify']
		}),
		gulp.dest('wwwroot', { sourcemaps: '.' }),
		gulpGzip(),
		gulp.dest('wwwroot'),
	);
});
