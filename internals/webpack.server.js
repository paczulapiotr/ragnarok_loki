const path = require("path");

module.exports = {
  target: "node",
  node: {
    __dirname: false,
    __filename: false
  },
  resolve: {
    extensions: [".js"]
  },
  mode: "production",
  entry: {
    main: ["./src/server.js"]
  },
  output: {
    path: path.resolve(__dirname, "prod/"),
    filename: "server.js",
    publicPath: "/"
  }
};
