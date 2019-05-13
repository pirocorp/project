var gulp = require('gulp');
var browserSync = require('browser-sync').create();

var $ = require('gulp-load-plugins')();

var path = {
    SCSS_SRC    : './scss/**/*.scss',
    SCSS_DST    : './css',
    HTML_SRC    : ['./css/*.css', './*.html', './_posts/*.*', './_layouts/*.*', './_includes/*.*'],
}

gulp.task('scss', function(done) {
    gulp.src(path.SCSS_SRC)
        .pipe($.sass())
        .pipe($.autoprefixer({browsers: ['last 2 versions'], cascade: false}))
        .pipe($.size({ showFiles: true }))
        .pipe($.csso())
        .pipe($.size({ showFiles: true }))
        .pipe($.sourcemaps.write('map'))
        .pipe(gulp.dest( path.SCSS_DST ))
        .pipe(browserSync.stream({ match: '**/*.css' }));

    done();
});

gulp.task('jekyll', function(done) {
    require('child_process').exec('bundle exec jekyll build --baseurl=', {stdio: 'inherit'});
    done();
});

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./docs/"
        }
    });

    gulp.watch(path.SCSS_SRC, gulp.series('scss', 'jekyll'));
    gulp.watch(path.HTML_SRC, gulp.series('jekyll'));
    gulp.watch(path.HTML_SRC).on('change', browserSync.reload);
});

gulp.task('default', gulp.series('scss', 'jekyll', 'serve'));