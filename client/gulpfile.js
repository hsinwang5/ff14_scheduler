var gulp = require("gulp");
var imagemin = require("gulp-imagemin");
var sass = require("gulp-sass");

//compiles scss into css
gulp.task("sass", function() {
  gulp
    .src("src/sass/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("src/stylesheets"));
});

//watch scss files
gulp.task("watch", function() {
  gulp.watch("src/sass/*.scss", ["sass"]);
});
