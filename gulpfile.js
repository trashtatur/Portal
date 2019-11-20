const gulp = require("gulp");
const path = require("path");
const browserify = require("browserify");
const source = require('vinyl-source-stream');
const tsify = require("tsify");
const cssModulesify = require('css-modulesify');
const gulp_tcm = require('gulp-typed-css-modules');


gulp.task("browserify", function() {
    return browserify({
            entries: ["src/view/main.tsx"],
            debug: true
        })
        .require('react')
        .require('react-dom')
        .require('react-router')
        .require('react-router-dom')
        .plugin(tsify)
        .plugin(cssModulesify, {
            rootDir: path.resolve(__dirname,'src/view/components'),
            output: './build/bundle.css',
            cssFilePattern: '\.css',
        })
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(gulp.dest("./build"));
});


gulp.task('tcm', function(){
    return gulp.src(["src/**/*.module.css"], {
        base: '.',
    })
        .pipe(gulp_tcm())
        .pipe(gulp.dest(file => {
            return file.base
        }));
});

gulp.task("default", gulp.series('tcm','browserify'));