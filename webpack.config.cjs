// Webpack uses this to work with directories
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const path = require("path");
// This is the main configuration object.
// Here, you write different options and tell Webpack what to do
module.exports = {
    // Path to your entry point. From this file Webpack will begin its work
    entry: {
        index: "./src/ecoFood3.01.js",
        edit: "./src/edit/main.js",
    },

    // Path and filename of your result bundle.
    // Webpack will bundle all JavaScript into this file
    output: {
        // eslint-disable-next-line no-undef
        path: path.resolve(__dirname, "dist"),
        filename: "js/[name].[chunkhash].js",
    },

    optimization: {
        splitChunks: {
            chunks: "all",
        },
    },
    // Default mode for Webpack is production.
    // Depending on mode Webpack will apply different things
    // on the final bundle. For now, we don't need production's JavaScript
    // minifying and other things, so let's set mode to development
    mode: "development",
    devServer: {
        open: {
            target: "index.html",
            app: {
                name: "chrome",
                arguments: ["--incognito", "--new-window"],
            },
        },
    },

    devtool: "inline-source-map",
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                loader: "style-loader",
                // Don't consider CSS imports dead code even if the
                // containing package claims to have no side effects.
                // Remove this when webpack adds a warning or an error for this.
                // See https://github.com/webpack/webpack/issues/6571
                sideEffects: true,
            },
            {
                test: /\.css$/i,
                loader: "css-loader",
                // Don't consider CSS imports dead code even if the
                // containing package claims to have no side effects.
                // Remove this when webpack adds a warning or an error for this.
                // See https://github.com/webpack/webpack/issues/6571
                options: {
                    url: false,
                },
                sideEffects: true,
            },

            {
                test: /\.?(js|ts|tsx|jsx)$/i,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
                    },
                },
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/pages/index.html",
            chunks: ["index", "foodListController"],
            filename: "index.html",
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
        }),
        new HtmlWebpackPlugin({
            template: "./src/pages/edit/index.html",
            filename: "edit/index.html",
            chunks: ["edit", "foodListController"],
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "./src/public/",
                    to: "./public",
                    force: true,
                },
            ],
        }),
        new CleanWebpackPlugin(),
    ],
};
