'use strict';
// include the required packages.
var gulp = require('gulp'),
    cache = require('gulp-cache'),
    stylus = require('gulp-stylus'),
    livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),
    imagemin = require('gulp-imagemin'),
    connect = require('gulp-connect'),
    plumber = require('gulp-plumber'),
    prefixer = require('autoprefixer-stylus'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync'),
    bootstrap = require('bootstrap-styl'),
    server = lr();
var paths = {
    html : [
        'src/*.html'
    ],
    scripts: [
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'src/js/*.js'
    ],
    stylus: [
        'src/styles/base/*.styl',
        'src/styles/conteiners/**/*.styl',
        'src/styles/main.styl'
    ],
    css: [
        'node_modules/jquery-ui/themes/base/slider.css',
        'src/styles/main.styl'
    ]
};
// Options
// Options compress
gulp.task('copy', function() {
    return gulp.src(paths.html)
        .pipe(gulp.dest('build/'))
});

// Call Uglify and Concat JS
gulp.task('js', function () {
    return gulp.src(paths.scripts)
        .pipe(plumber())
        .pipe(concat('main.js'))
        .pipe(gulp.dest('build/js'));
});

/*// Call Uglify and Concat JS
gulp.task('browserify', function () {
    return gulp.src('src/js/main.js')
        .pipe(plumber())
        .pipe(browserify({debug: !env.p}))
        .pipe(gulp.dest('build/js'));
});*/

// Call Stylus
gulp.task('stylus', function () {
    return gulp.src('src/styles/main.styl')
        .pipe(plumber())
        .pipe(stylus({
            use:[ bootstrap(),prefixer()]
        }))
        .pipe(gulp.dest('build/css/'));
});

// Call Imagemin
gulp.task('imagemin', function () {
    return gulp.src('src/img/*')
        /*.pipe(plumber())
        .pipe(cache(imagemin({optimizationLevel: 3, progressive: true, interlaced: true})))*/
        .pipe(gulp.dest('build/img'));
});

/*gulp.task('server', function() {
    connect.server({
        port: 8080,
        root: 'build/',
        livereload:true
    });

});*/

gulp.task('server', function () {
    var files = [
        'build/**/*.html',
        'build/css/!**!/!*.css',
        'build/img/!**!/!*',
        'build/js/!**/!*.js'
    ];

    browserSync.init(files, {
        server: {
            baseDir: './build/',
            host: 'localhost',
            port: 8080,
            index: 'main.html',
            open: true,
            tunnel: true
        }
    });
});

gulp.task('watch:js',function () {
    gulp.watch(paths.scripts,gulp.parallel('js'));
});
gulp.task('watch:stylus',function () {
    gulp.watch(paths.stylus,gulp.parallel('stylus'));
});
gulp.task('watch:html',function () {
    gulp.watch(paths.html,gulp.parallel('copy'));
});
gulp.task('watch', gulp.parallel('watch:js','watch:stylus','watch:html'));

gulp.task('secondary',gulp.parallel('watch', 'stylus','imagemin', 'copy', 'server'));
gulp.task('default' ,gulp.series('js','secondary'));
