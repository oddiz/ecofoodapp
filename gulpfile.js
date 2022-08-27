const fs = require("fs");
const { promisify } = require("util");
const gulp = require("gulp");
const { series, dest } = require("gulp");

const imagemin = require("gulp-imagemin");
const { src } = require("gulp");

const optimizeImages = (done) => {
    gulp.src("src/public/img/**/*").pipe(imagemin()).pipe(dest("dist/public/img"));

    done();
};

function uploadAndGzip() {
    const ecoBucket = "test.kaansarkaya.com";
    const awspublish = require("gulp-awspublish");
    const publisher = awspublish.create({
        region: "eu-west-2",
        params: {
            Bucket: ecoBucket,
        },
    });
    var headers = {
        "Cache-Control": "max-age=315360000, no-transform, public",
        // ...
    };

    var parallelize = require("concurrent-transform");

    return gulp
        .src("dist/**/*.js")
        .pipe(awspublish.gzip())
        .pipe(src(["dist/**/*", "!dist/**/*.js"]))
        .pipe(parallelize(publisher.publish(headers), 10))
        .pipe(publisher.sync())
        .pipe(awspublish.reporter());
}

exports.publish = series(optimizeImages, uploadAndGzip);
exports.checkcss = () => {
    const checkCSS = require("gulp-check-unused-css");
    gulp.src(["src/*.css", "src/public/*.html", "src/edit/index.html"]).pipe(checkCSS());
};
exports.default = () => {};
// async task sample
async function asyncAwaitTask() {
    const { version } = JSON.parse(fs.readFileSync("package.json", "utf8"));
    console.log(version);
    await Promise.resolve("some result");
}
