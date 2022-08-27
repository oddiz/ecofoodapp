// Webpack uses this to work with directories
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const path = require("path");

const mainConfig = require("./webpack.config.cjs");

// This is the main configuration object.
// Here, you write different options and tell Webpack what to do
module.exports = {
    ...mainConfig,
    mode: "production",
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
};
