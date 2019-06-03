const gulp = require(`gulp`);
const sass = require(`gulp-sass`);
const plumber = require(`gulp-plumber`);
const postcss = require(`gulp-postcss`);
const autoprefixer = require(`autoprefixer`);
const csso = require(`gulp-csso`);
const rename = require(`gulp-rename`);
const imagemin = require(`gulp-imagemin`);
const webp = require(`gulp-webp`);
const svgstore = require(`gulp-svgstore`);
const svgmin = require(`gulp-svgmin`);
const del = require(`del`);
const uglify = require(`gulp-uglify`);
const browsersync = require(`browser-sync`).create();

//  /////////////////////////////////////////////////////////////////////////////////
//
//  ОБРАБОТКА HTML: копирование, обновление etc.
//
//  /////////////////////////////////////////////////////////////////////////////////

const streamHTMLtoBuild = () => {
  return gulp.src(`*.html`)
              .pipe(gulp.dest(`build`))
              .pipe(browsersync.stream());
};

const updateBuildHTML = (done) => {
  streamHTMLtoBuild();

  browsersync.reload();
  done();
};

//  /////////////////////////////////////////////////////////////////////////////////
//
//  ОБРАБОТКА CSS: компиляция SASS, вендорные префиксы, оптимизация, обновление.
//
//  /////////////////////////////////////////////////////////////////////////////////

const streamStylesToBuild = () => {
  return gulp.src(`sass/style.scss`)
              .pipe(plumber())
              .pipe(sass({
                indentType: `space`,
                indentWidth: `2`,
                outputStyle: `expanded`
              }))
              .pipe(postcss([
                autoprefixer({
                  browsers: [
                    `last 2 Chrome versions`,
                    `last 2 Firefox versions`,
                    `last 2 Opera versions`,
                    `last 2 Edge versions`
                  ]
                })
              ]))
              .pipe(gulp.dest(`build/css`))
              .pipe(csso({comments: false}))
              .pipe(rename({suffix: `.min`}))
              .pipe(gulp.dest(`build/css`))
              .pipe(browsersync.stream());
};

const updateBuildStyles = (done) => {
  del(`build/css`);
  streamStylesToBuild();

  browsersync.reload();
  done();
};

//  /////////////////////////////////////////////////////////////////////////////////
//
//  ОБРАБОТКА JAVASCRIPT:
//
//  /////////////////////////////////////////////////////////////////////////////////

const streamJStoBuild = () => {
  return gulp.src(`js/*.js`)
              .pipe(plumber())
              .pipe(gulp.dest(`build/js`))
              .pipe(uglify())
              .pipe(rename({suffix: `.min`}))
              .pipe(gulp.dest(`build/js`))
              .pipe(browsersync.stream());
};

const updateBuildJS = (done) => {
  del(`build/js`);
  streamJStoBuild();

  browsersync.reload();
  done();
};

//  /////////////////////////////////////////////////////////////////////////////////
//
//  ОБРАБОТКА ИЗОБРАЖЕНИЙ.
//
//  /////////////////////////////////////////////////////////////////////////////////

const optimizeBuildImages = () => {
  return gulp.src(`build/img/**/*.{png,jpg,jpeg,gif}`)
              .pipe(imagemin([
                imagemin.optipng({optimizationLevel: 3}),
                imagemin.gifsicle({interlaced: true}),
                imagemin.jpegtran({progressive: true})
              ]))
              .pipe(gulp.dest(`build/img`));
};

const streamWEBPimagesToBuild = () => {
  return gulp.src(`img/webp_source/*.{png,jpg,jpeg}`)
              .pipe(webp({quality: 90}))
              .pipe(gulp.dest(`build/img`));
};

const optimizeBuildSVG = () => {
  return gulp.src(`build/img/*.svg`)
              .pipe(svgmin({
                plugins: [
                  {
                    removeDimensions: false
                  },
                  {
                    removeAttrs: {
                      attrs: `class`
                    }
                  }
                ]
              }))
              .pipe(gulp.dest(`build/img`));
};

const streamSVGSpriteToBuild = () => {
  return gulp.src(`img/sprite_source/*.svg`)
              .pipe(svgmin({
                plugins: [
                  {
                    collapseGroups: false
                  },
                  {
                    mergePaths: false
                  }
                ]
              }))
              .pipe(svgstore({inlineSvg: true}))
              .pipe(rename(`sprite.svg`))
              .pipe(gulp.dest(`build/img`));
};

//  /////////////////////////////////////////////////////////////////////////////////
//
//  СБОРКА ПРОЕКТА.
//
//  /////////////////////////////////////////////////////////////////////////////////

const cleanBuild = () => del(`build`);

const streamBuildBasics = () => {
  return gulp.src([
      `fonts/**/*.{woff,woff2}`,
      `img/**`,
      `!img/sprite_source{,/**}`,
      `!img/webp_source{,/**}`,
      `*.ico`,
      `*.png`,
      `*.svg`
    ], {
      base: `.`
    })
    .pipe(gulp.dest(`build`));
};

gulp.task(`build`, gulp.series(
  cleanBuild,

  streamBuildBasics,
  streamHTMLtoBuild,
  streamStylesToBuild,
  streamJStoBuild,

  optimizeBuildImages,
  streamWEBPimagesToBuild,

  optimizeBuildSVG,
  streamSVGSpriteToBuild
));

//  /////////////////////////////////////////////////////////////////////////////////
//
//  LIVE-СЕРВЕР И ОБНОВЛЕНИЕ ДАННЫХ.
//
//  /////////////////////////////////////////////////////////////////////////////////

gulp.task(`browsersync`, () => {
  browsersync.init({
    server: `build/`,
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch(`*.html`, updateBuildHTML);
  gulp.watch(`sass/**/*.{scss,sass}`, updateBuildStyles);
  gulp.watch(`js/*.js`, updateBuildJS);
});
