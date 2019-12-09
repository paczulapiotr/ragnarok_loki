const path = require("path");

module.exports = {
  node: {
    __filename: true,
    __dirname: true
  },
  target: "node",
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
