"use strict";

let gulp = require("gulp"),
    autoprefixer = require("gulp-autoprefixer"),
    browserSync = require('browser-sync').create();

gulp.task("css", function () {
    return gulp.src('_assets/css/**/*.css')
        .pipe(autoprefixer())
        .pipe(gulp.dest('docs/css/'))
        .pipe(browserSync.stream({ match: '**/*.css' }))
        ;
});

gulp.task("watch", function () {

    browserSync.init({
        server: {
            baseDir: "./docs/"
        }
    });

    gulp.watch('_assets/css/**/*.css', gulp.series('css'));

    gulp.watch('docs/**/*.html').on('change', browserSync.reload);
    gulp.watch('docs/**/*.js').on('change', browserSync.reload);
});

gulp.task("default", gulp.series("watch"));