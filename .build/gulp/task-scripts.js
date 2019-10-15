import gulp from 'gulp';

import webpack from 'webpack';
import gulpWebpack from 'webpack-stream';
import livereload from 'gulp-livereload';
import VueLoaderPlugin from 'vue-loader/lib/plugin';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import fs from "fs";

import babelloader from 'babel-loader';

function getDirectories(path) {
	return fs.readdirSync(path).filter(function (file) {
		if (file.indexOf('_') !== 0) {
			return fs.statSync(path + '/' + file).isDirectory();
		}
	});
}

export const task = config => {
	return new Promise(resolve => {
		const bundles = getDirectories(`${config.assetsBuild}scripts/`);
		let loaded = 0;
		bundles.forEach(bundle => {
			gulp.src([
				`${config.assetsBuild}scripts/${bundle}/*.js`
			])
			// Webpack
				.pipe(
					gulpWebpack({
						mode: 'development',
						module: {
							rules: [
								{
									test: /\.vue$/,
									loader: 'vue-loader',
									exclude: /node_modules/,
								},
								{
									test: /\.js$/,
									exclude: /node_modules/,
									loader: "babel-loader"
								}
							]
						},
						plugins: [
							new VueLoaderPlugin()
						],
						optimization: {
							minimize: false
						},
						output: {
							filename: `${bundle}.js`
						},
						externals: {
							"vue": "Vue"
						}
					}, webpack)
				)
				.on('error', config.errorLog)
				.pipe(gulp.dest(config.assetsDir + 'scripts/'))

				// Minify
				.pipe(uglify())
				.pipe(rename({
					suffix: '.min'
				}))
				.on('error', config.errorLog)
				.pipe(gulp.dest(config.assetsDir + 'scripts/'))

				//reload
				.pipe(livereload());
			loaded++;
			if (loaded === bundles.length) {
				resolve();
			}
		});
	});
};
