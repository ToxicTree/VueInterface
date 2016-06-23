var gulp = require('gulp');

/*
 * Using Elixir to convert and bundle modules, scss and vendor-scripts.
 */

var elixir = require('laravel-elixir');
require('laravel-elixir-vueify');

elixir.config.js.browserify.options.debug=true;

gulp.task('elixirLauncher', function(){
    return elixir(function(mix){

        mix
            .browserify('./src/main.js','./js/app.js');

        mix
            .sass('./src/scss/main.scss','./css/app.css');

    })
})

// Set the 'default' gulp-task
gulp.tasks.default = gulp.tasks.elixirLauncher;
gulp.tasks.watch = gulp.tasks.elixirLauncher;
