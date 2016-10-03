'use strict'

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps');

//define a task
//use gulp task method
//first paramenter - name of task
//second is callback
gulp.task("hello", function(){
    //this task will run if in cli you 'gulp hello'
    console.log("Hello!");
})

gulp.task("concatScripts", function(){
    //in order to use concat, we need to get all the src files together
    //grab source files you want to concat with gulp.src
    //can take an array of file names or a string of a single file
    //note, the return was not here for most of our activity
        //works without it but...with it, acts kinda like a promise, now other tasks can tell when this task finishes vs not knowing and running concurrently?
        //but the return is not needed if other tasks don't depend on the task'
    return gulp.src([
        //note, order does matter - just like when loading scripts to html
        'js/jquery.js',
        'js/sticky/jquery.sticky.js',
        'js/main.js'
    //gulp.src creates a readable stream of data - node thing - it is an in-memory piece of data that can be used by the app
    //there are huge benefits to managing this type of data in memory vs writing to disk
    ]).pipe(concat('app.js'))
    //.pipe gets the readable stream of data to the method you want --concat
    //concat takes an arg--what you want the name of the resulting file to be
    //but it's still just a 'readable stream of data', so to write it to disk...
    .pipe(gulp.dest("js"))
    //write to disk with gulp.dest
    //arg is folder we want to write to
})

gulp.task("minifyScripts", ["concatScripts"], function(){
    //since concatScripts is a dependency, it will run before this is allowed to run
    return gulp.src("js/app.js")
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        //will totally work without above line, but will overwrite app.js, which we don't want in dev for debugging'
        .pipe(gulp.dest('js'));
})

gulp.task("compileSass", function(){
    return gulp.src("scss/application.scss")
        //we only need grab the one sass file cause that file actually imports all the other sass files
        .pipe(maps.init()) //optional bit for mapping part 1 - for making a map to help show what sass file css parts come from
        .pipe(sass())
        .pipe(maps.write('./')) //optional bit for mapping part 2
            //arg is where you want map to live, path is relative to the gulp.dest directory below
            //we want it in the same directory
        .pipe(gulp.dest("css"))

})

gulp.task("build", ["minifyScripts", "compileSass"], function(){})



//the task named 'default' will run automatically
//if you give it dependencies, they will run BEFORE the actual default task/actions runs
    //dependencies are given in second arg, as array of strings--names of other tasks
gulp.task('default', ["build"], function(){
    console.log("default run");
})



//did this on another branch in example so may not work but just putting here...
//using watch---any time a file changes, run a specified task

gulp.task('watchSass', function(){
    gulp.watch(['scss/**/*.scss'], ['compileSass']);
    //watch takes 2 ags - second is what task to run when a change happens
    //1st is what to watch in 1 of 2 formats
        //1- just an array of files(with paths), but cumbersome
        //2- an array of globbing patterns - a syntax for matching names of files
                // ** says look at all subdirectories here 
                // *.scss says look at all scss files in them
})