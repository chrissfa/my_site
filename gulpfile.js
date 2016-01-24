// gulp
var gulp = require('gulp');

// plugins
var jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  minifyCSS = require('gulp-minify-css'),
  clean = require('gulp-clean'),
  sass = require('gulp-ruby-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  rename = require('gulp-rename'),
  notify = require('gulp-notify'),
  watch = require('gulp-watch'),
  del = require('del'),
  browserSync = require('browser-sync').create(),
  reload      = browserSync.reload,
  modRewrite  = require('connect-modrewrite');
// tasks


gulp.task('clean', function(cb) {
  del(['dist/css', 'dist/js', 'dist/partials'], cb)
});


gulp.task('fonts', function() {
  return gulp.src(['app/font/*.*'])
    .pipe(gulp.dest('dist/font/'));
});

gulp.task('styles', function() {
   console.log('Styles Working!'); 
  //return gulp.src(['./app/css/main.scss'])
    //.pipe(sass({ style: 'expanded' }))

    return sass('./app/css/main.scss', {
      style: 'expanded',
      "sourcemap=none": true //hack to allow autoprefixer to work
    })
    .pipe(notify({ message: 'Styles task complete 1' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(notify({ message: 'Styles task complete 2' }))
    .pipe(rename({suffix: '.min'}))
        .pipe(notify({ message: 'Styles task complete 3' }))
    .pipe(minifyCSS())
        .pipe(notify({ message: 'Styles task complete 4' }))
    .pipe(gulp.dest('./dist/css'))
        .pipe(notify({ message: 'Styles task complete 5' }))
    .pipe(notify({ message: 'Styles task complete' }))
    .pipe(reload({stream: true})); 
});


gulp.task('minifycss', function () { // just minify this css file.
    gulp.src('./app/css/undohtml.css')
    .pipe(minifyCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/css'));

});


gulp.task('scripts', function() {
  gulp.src(['./app/**/*.js', './app/**/*.js', '!./app/bower_components/**'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
  gulp.src(['./app/**//**.js', '!./app/bower_components/**'])
    .pipe(uglify({
          compress: {
         drop_console: false
    }

    }))
    .pipe(gulp.dest('./dist/'))
    .pipe(reload({stream: true})); 
});


gulp.task('images', function() {
    var imgSrc = './app/img/**/*'
    return gulp.src(imgSrc)
        .pipe(gulp.dest('./dist/img'))
        .pipe(notify({ message: 'Images task complete' }));
});


gulp.task('bower', function () {
  gulp.src('./app/bower_components/**')
    .pipe(gulp.dest('dist/bower_components'));
});




gulp.task('html', function () {
  gulp.src('./app/**/*.html')
    .pipe(gulp.dest('dist/'))
    .pipe(reload({stream: true}));     
 
});





gulp.task('browser-sync', function() {
    browserSync.init({
      server: "./app",
        middleware: [
          modRewrite (['^[^\\.]*$ /index.html [L]']) // needed so /*.* will default back to home page
        ], 

      host: "127.0.0.1",
 

        https: false,
        port: 444,
  
        server: {
            baseDir: "dist"
        }
    });
});

// watches
gulp.task('watch', function() {


  gulp.watch(
    [
      './app/css/main.scss'
    ],
    ['styles']
  );
  gulp.watch('./app/index.html', ['html']);
  gulp.watch('./app/partials/*.html', ['html']);
  gulp.watch('./app/js/*.js', ['scripts', 'html']);


});


// default task
gulp.task('default',
  ['styles', 'minifycss', 'scripts', 'images', 'html', 'fonts', 'bower', 'watch', 'browser-sync']
);
// build task
gulp.task('build',
  ['styles', 'minifycss', 'scripts', 'images', 'html', 'fonts', 'bower', 'watch', 'browser-sync']
);


