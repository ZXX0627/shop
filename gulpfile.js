const gulp = require("gulp");

const cssmin = require("gulp-cssmin");
const autoprefixer = require("gulp-autoprefixer");

const sass = require("gulp-sass");

const babel = require("gulp-babel");
const uglify = require("gulp-uglify");

const htmlmin = require("gulp-htmlmin");

const del = require("del");

const webserver = require("gulp-webserver");

const cssHandler = function () {
  return gulp
    .src("./src/css/*.css")
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(gulp.dest("./dirt/css"));
};

const sassHandler = function () {
  return gulp
    .src("./src/sass/*.scss")
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(gulp.dest("./dirt/css"));
};

const jsHandler = function () {
  return gulp
    .src("./src/js/*.js")
    .pipe(gulp.dest("./dirt/js"));
};

const htmlHandler = function () {
  return gulp
    .src("./src/pages/*.html")
    .pipe(
      htmlmin({
        removeAttributeQuotes: true, // 删除属性中的双引号
        removeComments: true, // 删除注释
        // removeEmptyAttributes:true,                 // 删除空属性
        // removeEmptyElements: true, // 删除空标签
        removeScriptTypeAttributes: true, // 删除 script标签的 type属性
        removeStyleLinkTypeAttributes: true, // 删除 link标签的的 type属性
        collapseBooleanAttributes: true, // 删除布尔属性的属性值
        collapseWhitespace: true, // 删除标签之间的空格
        minifyJS: true, // 压缩内容js程序
        minifyCSS: true, // 压缩内部css程序
      })
    )
    .pipe(gulp.dest("./dirt/pages"));
};

const delHandler = function () {
  return del(["./dirt"]);
};

const toolsHandler = function () {
  return gulp.src("./src/tools/**").pipe(gulp.dest("./dirt/tools"));
};
const imgHandler = function () {
  return gulp.src("./src/img/**").pipe(gulp.dest("./dirt/img"));
};
const serverHandler = function () {
  return gulp.src("./src/server/**").pipe(gulp.dest("./dirt/server"));
};

const fontHandler = function () {
  return gulp.src("./src/font/**").pipe(gulp.dest("./dirt/font"));
};

const watchHandler = function () {
  gulp.watch("./src/css/*.css", cssHandler);
  gulp.watch("./src/js/*.js", jsHandler);
  gulp.watch("./src/sass/*.scss", sassHandler);
  gulp.watch("./src/tools/**", toolsHandler);
  gulp.watch("./src/server/**", serverHandler);
  gulp.watch("./src/img/**", imgHandler);
  gulp.watch("./src/font/**", fontHandler);
};

const webHandler = function(){
  gulp.src('./dirt').pipe(webserver({
    host:'127.0.0.1',
    port:"8080",
    open:"./index.html",
    livereload:true,
   
  }))
}

module.exports.default = gulp.series(
  delHandler,
  gulp.parallel(
    cssHandler,
    jsHandler,
    sassHandler,
    htmlHandler,
    toolsHandler,
    serverHandler,
    imgHandler,
    fontHandler
  ),
  webHandler,
  watchHandler
);
