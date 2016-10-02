'use strict'

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

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
    gulp.src([
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

gulp.task("minifyScripts", function(){
    gulp.src("js/app.js")
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    //will totally work without above line, but will overwrite app.js, which we don't want in dev for debugging'
    .pipe(gulp.dest('js'));
})



//the task named 'default' will run automatically
//if you give it dependencies, they will run BEFORE the actual default task/actions runs
    //dependencies are given in second arg, as array of strings--names of other tasks
gulp.task('default', ["hello"], function(){
    console.log("default running");
})