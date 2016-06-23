var gulp = require('gulp');

/*
 * Using Elixir to convert and bundle modules, scss and vendor-scripts.
 */

var elixir = require('laravel-elixir');
require('laravel-elixir-vueify');

elixir.config.js.browserify.options.debug=true;

gulp.task('elixir', function(){
	return elixir(function(mix){
		mix
			.browserify('./src/main.js','./js/app.js')
	    mix
	    	.sass('./src/scss/main.scss', './css/app.css');
	    mix
	    	.scripts(
	            [
	                //'jquery-2.2.4.min.js'
	                'jquery-3.0.0.min.js'
	            ],
	            'js/dependencies.min.js',
	            'src/vendor'
	    	);
	})
})

// Set the 'default' gulp-task
gulp.tasks.default = gulp.tasks.elixir;
gulp.tasks.watch = gulp.tasks.elixir;
