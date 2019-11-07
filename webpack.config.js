const HtmlWebPackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader"
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(s*)css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader"
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "src/"),
      components: path.resolve(__dirname, "src/components/"),
      assets: path.resolve(__dirname, "src/assets/"),
      layouts: path.resolve(__dirname, "src/layouts/"),
      store: path.resolve(__dirname, "src/store/"),
      utils: path.resolve(__dirname, "src/utils/"),
      app: path.resolve(__dirname, "src/app/"),
      api: path.resolve(__dirname, "src/api/"),
      views: path.resolve(__dirname, "src/views/"),
      typings: path.resolve(__dirname, "src/typings/"),
      logic: path.resolve(__dirname, "src/logic/"),
      views: path.resolve(__dirname, "src/views/")
    },
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new CopyPlugin([
      { from: "./src/sw.js", to: "" },
      { from: "./src/manifest.json", to: "" },
      { from: "./src/assets/icons", to: "public" }
    ])
  ],
  optimization: {
    minimizer: [new TerserPlugin()]
  }
};
