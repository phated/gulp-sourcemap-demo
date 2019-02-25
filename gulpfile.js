const gulp = require('gulp');
const gulpBabel = require('gulp-babel');
const gulpClone = require('gulp-clone');
const gulpGzip = require('gulp-gzip');
const pump = require('pump');
const merge2 = require('merge2');

const sourcemapWrite = require('vinyl-fs/lib/dest/sourcemap');

gulp.task('default', () => {
	const stream = pump(
		gulp.src('src/**', {sourcemaps: true}),
		gulpBabel({
			presets: ['minify']
		}),
		sourcemapWrite({
			resolve: () => '.'
		})
	);

	const merged = merge2(
		stream,
		pump(
			stream,
			gulpClone(),
			gulpGzip()
		)
	);

	return pump(
		merged,
		gulp.dest('wwwroot')
	);
});
