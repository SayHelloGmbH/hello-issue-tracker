import gulp from 'gulp';
import livereload from 'gulp-livereload';

const config = {
	name: 'Hello Issue Tracker',
	key: 'helloissuetracker',
	assetsDir: 'assets/',
	gulpDir: './.build/gulp/',
	assetsBuild: '.build/assets/',
	errorLog: function (error) {
		console.log('\x1b[31m%s\x1b[0m', error);
		if (this.emit) {
			this.emit('end');
		}
	},
	reload: [
		'*.php',
		'{src,templates}/**/*.{php,html}'
	]
};

import {task as taskStyles} from './.build/gulp/task-styles';
import {task as taskScripts} from './.build/gulp/task-scripts';
import {task as taskReload} from './.build/gulp/task-reload';
import {task as taskSvg} from './.build/gulp/task-svg';

export const styles = () => taskStyles(config);
export const scripts = () => taskScripts(config);
export const reload = () => taskReload(config);
export const svg = () => taskSvg(config);
export const watch = () => {

	const settings = {usePolling: true, interval: 500};

	livereload.listen();

	gulp.watch(config.assetsBuild + 'styles/**/*.scss', settings, gulp.series(styles));
	gulp.watch(config.assetsBuild + 'scripts/**/*.{js,vue}', settings, gulp.series(scripts));
	gulp.watch([config.assetsDir + '**/*.svg', '!' + config.assetsDir + '**/*.min.svg'], settings, gulp.series(svg));
	gulp.watch(config.reload).on('change', livereload.changed);
};

export default gulp.series(gulp.parallel(styles, scripts, svg), reload, watch);
