const merge = require("webpack-merge"); // eslint-disable-line
const path = require("path");
const common = require("../webpack.config");

module.exports = merge(common, {
  mode: "production",
  entry: {
    main: ["@babel/polyfill", "./src/index.tsx"]
  },
  output: {
    path: path.resolve(__dirname, "prod/static/"),
    filename: "[name].bundle.js",
    chunkFilename: "[name].bundle.js",
    publicPath: "/"
  }
});
