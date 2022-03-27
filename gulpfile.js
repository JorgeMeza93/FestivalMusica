const {src, dest, watch, parallel} = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cssnano = require("gulp-cssnano");
const sourcemaps = require('gulp-sourcemaps'); 
const terser = require('gulp-terser-js');

//Imágenes
const webp = require('gulp-webp');

function css( done ){

    src('src/scss/**/*.scss') // Identificar el archivo .SCSS a compilar
        .pipe( sass() ) //Compilar el archivo scss a css
        .pipe( cssnano() ) //Minifica la
        .pipe( dest("build/css") );  //Almacenarlo
    done();
}
function versionWebp(done){
    const opciones = {
        quality: 70
    };
    src('img/**/*.{png,jpg}')
        .pipe( webp(opciones) )
        .pipe( dest('build/img') )
    done();
}
function javascript(done){
    src('src/js/**/*.js')
        .pipe( sourcemaps.init() )
        .pipe( terser() )
        .pipe( sourcemaps.write('.'))
        .pipe(dest('build/js'));
    done();
}
function dev(done){
    watch("src/scss/**/*.scss", css);
    watch("src/js/**/*.js", javascript);
    done();
}


exports.css = css;
exports.js = javascript;
exports.versionWebp = versionWebp;
exports.dev = parallel(versionWebp, javascript, dev);