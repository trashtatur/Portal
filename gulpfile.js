const gulp = require("gulp");
const path = require("path");
const browserify = require("browserify");
const source = require('vinyl-source-stream');
const tsify = require("tsify");
const cssModulesify = require('css-modulesify');
const gulp_tcm = require('gulp-typed-css-modules');


gulp.task("browserify", function() {
    return browserify({
            entries: ["src/public/view/main.tsx"],
            debug: true,
        })
        .require('react')
        .require('react-dom')
        .require('react-router')
        .require('react-router-dom')
        .plugin(tsify)
        .plugin(cssModulesify, {
            rootDir: path.resolve(__dirname,'src/public/view/components'),
            output: './build/bundle.css',
            cssFilePattern: '\.css',
        })
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(gulp.dest("./build"));
});


gulp.task('tcm', function(){
    return gulp.src(["src/public/view/components/**/*.css"], {
        base: '.',
    })
        .pipe(gulp_tcm())
        .pipe(gulp.dest(file => {
            return `./build/cssTypes/${file.base}`
        }));
});

gulp.task('watch',function () {
    gulp.watch('src/public/view/components/**/*.tsx',gulp.series('browserify'));
    gulp.watch('src/public/view/components/**/*.css',gulp.series('default'));
});

gulp.task("default", gulp.series('tcm', 'browserify', 'watch'));