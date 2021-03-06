'use strict';

const del = require('del');
const fs = require('fs-extra');
const path = require('path');
const globby = require('globby');
const webpack = require('webpack');
const browserSync = require('browser-sync');
const runSequence = require('run-sequence');
const gulpif = require('gulp-if');
const gulpwatch = require('gulp-watch');
const prefix = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const less = require('gulp-less');
const csso = require('gulp-csso');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const chalk = require('chalk');
const moment = require('moment');
const regenManifest = require('./manifest-tools');

module.exports = (gulp, config, webpackConfig) => {
    const env = process.env.NODE_ENV || 'development';
    const assetPath = p => {
        p.dirname = p.dirname.split('assets').pop();
    };
    const markupPath = p => {
        if (p.extname === '.css') {
            p.dirname = config.dest.style.split(config.dest.markup).pop();
        }
    };

    // Update config from environment variables
    config.port.browsersync = process.env.hasOwnProperty('APP_PORT')
        ? process.env.APP_PORT
        : config.port.browsersync;

    const timestamp = () => {
        let now = moment().format('HH:mm:ss');
        return `[${chalk.blue(now)}]`;
    };

    const watcher = e => {
        let src = path.relative(path.resolve(__dirname), e.path);
        let fpath = `${config.dest.dist}/${path.relative(
            path.resolve(config.src.app),
            e.path
        )}`;
        let dest = path.normalize(path.dirname(fpath));
        let ext = path.extname(src);

        if (fs.existsSync(fpath)) {
            del.sync([fpath]);
        }

        if (e.event !== 'unlink') {
            gulp.src(src).pipe(gulp.dest(dest));
        }

        console.log(`${timestamp()} File ${e.event}: ${src} -> ${fpath}`);
    };

    return {
        assets: () => {
            // Copy assets dir
            return gulp
                .src(config.src.assets)
                .pipe(rename(assetPath))
                .pipe(gulp.dest(config.dest.assets));
        },
        build: done => {
            // Build
            runSequence(
                ['clean'],
                ['scripts', 'assets', 'styles'],
                ['markup'],
                done
            );
        },
        clean: done => {
            // Remove build files
            del.sync([config.dest.dist]);
            done();
        },
        default: done => {
            // Default gulp command
            if (env === 'development') {
                runSequence(['build'], ['watch'], () => {
                    gulp.start('serve');
                    done();
                });
            } else {
                runSequence(['build'], () => {
                    done();
                });
            }
        },
        manifest: done => {
            // Generate manifest.js file
            regenManifest();
            done();
        },
        markup: () => {
            // Copy markup
            return gulp
                .src(config.src.markup)
                .pipe(rename(markupPath))
                .pipe(gulp.dest(config.dest.markup));
        },
        scripts: done => {
            // Compile js
            let isDev = env === 'development';

            if (!isDev) {
                webpack(webpackConfig, (err, stats) => {
                    if (err) {
                        console.log(err());
                        done();
                        return;
                    }

                    let result = stats.toJson();

                    if (result.errors.length > 0) {
                        result.errors.forEach(error => {
                            console.log(error);
                        });

                        done();
                        return;
                    }

                    done();
                });
            } else {
                done();
            }
        },
        serve: done => {
            // Serve locally
            // Delay to allow server time to start
            setTimeout(() => {
                browserSync({
                    notify: false,
                    timestamps: true,
                    logPrefix: '00:00:00',
                    port: config.port.browsersync,
                    ui: { port: config.port.browsersync + 1 },
                    proxy: `localhost:${config.port.proxy}`
                });

                done();
            }, 5000);
        },
        static: done => {
            // Build static site
            runSequence(
                ['clean'],
                ['scripts', 'assets', 'styles'],
                ['markup'],
                ['static:copy'],
                done
            );
        },
        'static:copy': done => {
            // Copy static files
            fs.copySync(config.dest.dist, config.dest.static);

            let mainPage = path.normalize(
                `${config.dest.static}/index-static.html`
            );

            if (fs.existsSync(mainPage)) {
                let newName = mainPage
                    .split('index-static.html')
                    .join('index.html');
                fs.renameSync(mainPage, newName);
            }

            done();
        },
        'styles:colors': done => {
            if (config.cssPreProcessor === 'sass') {
                // Currently only works with sass
                let colorProfiles = globby.sync(config.src.colors);
                if (colorProfiles.length > 0) {
                    let colorFileContents =
                        '// WARNING: Do not directly edit this file !!!!\n// File generated by gulpfile.js > colors task: ';
                    colorFileContents += `${moment().format('LLL')}\n\n`;

                    let colorVars = [];
                    let colorArr = [];

                    colorProfiles.forEach(filePath => {
                        let profile = fs.readFileSync(path.resolve(filePath));
                        profile = JSON.parse(profile);

                        Object.keys(profile).forEach(k => {
                            let code = profile[k];
                            let cvar = `$${k}`;
                            let vline = `${cvar}: ${code};`;
                            let cname = k.split('color-').join('');
                            let aline = `\t"${cname}": ${cvar}`;

                            colorVars.push(vline);
                            colorArr.push(aline);
                        });
                    });

                    colorFileContents += colorVars.join('\n') + '\n\n\n';
                    colorFileContents += `$color: (\n${colorArr.join(
                        ',\n'
                    )}\n);\n\n\n`;
                    colorFileContents +=
                        '@each $clr-name, $clr-code in $color {\n\t.#{$clr-name} { color: $clr-code; }\n\t.bg-#{$clr-name} { background-color: $clr-code; }\n}';

                    fs.ensureFileSync(config.dest.colors);
                    fs.writeFileSync(
                        config.dest.colors,
                        colorFileContents,
                        'utf8'
                    );
                }
            }

            done();
        },
        'styles:compile': () => {
            // Compile Sass & Less
            let isDev = env === 'development';
            let isSass = config.cssPreProcessor === 'sass';
            let isLess = config.cssPreProcessor === 'less';

            return gulp
                .src(config.src.style)
                .pipe(gulpif(isDev, sourcemaps.init()))
                .pipe(
                    gulpif(
                        isSass,
                        sass({ includePaths: config.src.includes }).on(
                            'error',
                            sass.logError
                        )
                    )
                )
                .pipe(gulpif(isLess, less({ paths: config.src.includes })))
                .pipe(prefix(config.browsers))
                .pipe(gulpif(!isDev, csso()))
                .pipe(gulpif(isDev, sourcemaps.write()))
                .pipe(rename({ dirname: '' }))
                .pipe(gulp.dest(config.dest.style))
                .pipe(gulpif(isDev, browserSync.stream()));
        },
        styles: done => {
            runSequence(['styles:colors'], ['styles:compile'], done);
        },
        watch: done => {
            // Watch for file changes
            gulp.watch(config.watch.colors, ['styles']);
            gulp.watch(config.watch.style, ['styles']);
            gulpwatch(config.watch.markup, watcher);
            gulpwatch(config.watch.assets, watcher);
            const scriptWatcher = gulp.watch(config.watch.js, () => {
                runSequence(['manifest']);
            });

            done();
        }
    };
};
