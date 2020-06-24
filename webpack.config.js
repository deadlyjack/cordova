const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  mode: 'development',
  entry: {
    main: "./src/main.js"
  },
  output: {
    path: path.resolve(__dirname, "www/js/"),
    filename: "[name].min.js",
    chunkFilename: "[name].chunk.js"
  },
  module: {
    rules: [{
        test: /\.hbs$/,
        use: ['raw-loader']
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../",
              hmr: process.env.NODE_ENV === "development"
            }
          },
          "css-loader?url=false",
          "sass-loader",
          "postcss-loader"
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "../css/[name].css",
      chunkFilename: "../css/[id].chunk.css"
    })
  ]
};