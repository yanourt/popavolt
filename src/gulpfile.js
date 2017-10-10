var gulp = require('gulp'),
    // pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    fileinclude = require ('gulp-file-include'),
    // puginheritance = require('gulp-pug-inheritance'),
    browserSync = require('browser-sync').create();
    loc = __dirname;
    var dir = loc.substring(0, loc.lastIndexOf("\'"));


gulp.task('watch', function(){
    browserSync.init({
        server: "../dist"
    });
     gulp.watch('templates/**/*.html', ['html-w']).on('change', function(event){
        console.log("Le fichier:");
        console.log('   ' + event.path.replace(loc, ''));
        console.log('a ete modifie le:');
        console.log('   ' + new Date().toUTCString());
    });
    gulp.watch('parts/*.html', ['html-w']).on('change', function(event){
        console.log("Le fichier:");
        console.log('   ' + event.path.replace(loc, ''));
        console.log('a ete modifie le:');
        console.log('   ' + new Date().toUTCString());
    }); 
    gulp.watch('css/*.scss', ['sass-w']).on('change', function(event){
        console.log("Le fichier:");
        console.log('   ' + event.path.replace(loc, ''));
        console.log('a ete modifie le:');
        console.log('   ' + new Date().toUTCString());
    });
    gulp.watch('js/*.js', ['concat-w']).on('change', function(event){
        console.log("Le fichier:");
        console.log('   ' + event.path.replace(loc, ''));
        console.log('a ete modifie le:');
        console.log('   ' + new Date().toUTCString());
    });

});
gulp.task('sass-w', ['sass'], function(done){
    browserSync.reload();
    done();
});
gulp.task('html-w', ['html'], function(done){
    browserSync.reload();
    done();
});

gulp.task('concat-w', ['concat'], function(done){
    browserSync.reload();
    done();
});

gulp.task('sass', function(){
    return gulp.src('css/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest('../dist/css'));
});
gulp.task('html', function(){
    return gulp.src('templates/**/*.html')
        // .pipe(puginheritance({basedir: 'templates/'}))
        .pipe(plumber())
        .pipe(fileinclude({
            prefix: '@@',
            basepath: './parts/'
        }))
        .pipe(gulp.dest('../dist'));
});

gulp.task('concat', function(){
    return gulp.src('js/*.js')
        .pipe(plumber())
        .pipe(concat('app.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('../dist/js/'));
});





gulp.task('default', ['sass', 'html', 'concat', 'watch']);
