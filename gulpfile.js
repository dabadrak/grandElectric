let gulp = require('gulp'), //Подключаем сам gulp
    sass = require('gulp-sass'), // Компиляция scss в css
    autoPrefixer = require('gulp-autoprefixer'), // Вендорные префиксы
    bs = require('browser-sync'), // Server
    rename = require('gulp-rename'), // Rename
    delFiles = require('del'), // Delete files
    // babel = require('gulp-babel'), // Babel
    imageMin = require('gulp-imagemin'), // ImageMin
    pug = require('gulp-pug');


// Методы
// gulp.task() - создание новой задачи
// gulp.src() - получение файлов
// gulp.dest() - сохранение файлов
// gulp.series() - запуск задач по порядку (по порядку аргументов)
// gulp.parallel() - запуск задач параллельно
// gulp.watch() - следит за файлами

gulp.task('clear', () => {
  return delFiles(['dist/**', 'dist/**/*.*', '!dist', '!dist/packages/**', "!dist/bower_components/**"])
});

gulp.task('pug', () => {
  return gulp.src('app/pug/*.pug')
      .pipe(pug({
        pretty: true,
      }))
      .pipe(gulp.dest('dist'))
});
gulp.task('sass', () => {
  // return gulp.src('app/scss/**/*.+(scss|scss)');
  // return gulp.src('app/img/**/*.+(jpg|png|gif|svg)');
  return gulp.src('app/sass/**/*.sass')
      .pipe(sass())
      .pipe(autoPrefixer())
      .pipe(gulp.dest('dist/css'))
});
gulp.task('js:es6', () => {
  return gulp.src('app/js/**/*.js')
      .pipe(rename({
        suffix: '.es6',
      }))
      .pipe(gulp.dest('dist/js'))
});
// gulp.task('babel', () => {
//   return gulp.src('app/js/**/*.js')
//       .pipe(babel({
//         presets: ['@babel/env']
//       }))
//       .pipe(rename({
//         suffix: '.es5'
//       }))
//       .pipe(gulp.dest('dist/js'))
// });
gulp.task('imageMin', () => {
  return gulp.src('app/img/**/*.*')
      .pipe(imageMin())
      .pipe(gulp.dest('dist/img'))
});
gulp.task('fonts', () => {
  return gulp.src('app/fonts/**/*.*')
      .pipe(gulp.dest('dist/fonts'))
});
gulp.task('json', () => {
  return gulp.src('app/json/**/*.*')
      .pipe(gulp.dest('dist/json'))
});
gulp.task('php', () => {
  return gulp.src('app/php/**/*.*')
      .pipe(gulp.dest('dist/php'))
});

gulp.task('server', () => {
  return bs({
    browser: 'chrome',
    server: {
      baseDir: 'dist',
    },
  })
});

gulp.task('pug:watch', () => {
  return gulp.watch(['app/pug/*.pug', 'app/pug/**/*.pug',], gulp.series('pug', (done) => {
    bs.reload();
    done();
  }))
});
gulp.task('sass:watch', () => {
  return gulp.watch('app/sass/**/*.sass', gulp.series('sass', (done) => {
    bs.reload();
    done();
  }))
});
gulp.task('js:watch', () => {
  return gulp.watch('app/js/**/*.js', gulp.series('js:es6', (done) => {
    bs.reload();
    done();
  }))
});
gulp.task('img:watch', () => {
  return gulp.watch('app/img/**/*', gulp.series('imageMin', (done) => {
    bs.reload();
    done();
  }))
});
gulp.task('fonts:watch', () => {
  return gulp.watch('app/fonts/**/*.*', gulp.series('fonts', (done) => {
    bs.reload();
    done();
  }))
});
gulp.task('json:watch', () => {
  return gulp.watch('app/json/**/*.*', gulp.series('json', (done) => {
    bs.reload();
    done();
  }))
});
gulp.task('php:watch', () => {
  return gulp.watch('app/php/**/*.*', gulp.series('php', (done) => {
    bs.reload();
    done();
  }))
});
gulp.task('html:watch', () => {
  return gulp.watch('app/html/*.html', gulp.series('html', (done) => {
    bs.reload();
    done();
  }))
});

gulp.task('default', gulp.series('clear', gulp.parallel('imageMin', 'fonts', 'sass', 'js:es6', 'pug', 'json', 'php'),
    gulp.parallel('pug:watch', 'sass:watch', 'img:watch', 'fonts:watch', 'js:watch', 'json:watch', 'php:watch', 'server')));