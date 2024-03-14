const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const WWW = path.join(process.cwd(), 'www');
clearOutputDir();

module.exports = {
  resolve: {
    modules: ['node_modules', 'src'],
  },
  stats: 'minimal',
  watchOptions: {
    ignored: ['**/node_modules', '**/server', '**/www'],
  },
  entry: {
    main: './src/main.js',
  },
  output: {
    path: WWW,
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: './',
  },
  module: {
    rules: [
      {
        test: /\.(hbs)$/,
        use: ['raw-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: [
          'html-tag-js/jsx/tag-loader.js',
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
      {
        test: /\.sql$/i,
        use: 'raw-loader',
      },
      {
        test: /\.module.(sa|sc|c)ss$/,
        use: [
          'raw-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /(?<!\.module)\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|ico|ttf|webp|eot|woff)(\?.*)?$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  externals: [externals()],
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
};

function externals() {
  const IGNORES = ['electron'];
  return function ignore({ request }, callback) {
    if (IGNORES.indexOf(request) >= 0) {
      return callback(null, `require('${request}')`);
    }
    return callback();
  };
}

function clearOutputDir() {
  const files = fs.readdirSync(WWW);
  files.forEach((file) => {
    if (!['index.html', 'favicon.ico', 'splash.svg'].includes(file)) {
      const entry = path.join(WWW, file);
      if (fs.statSync(entry).isDirectory()) {
        fs.rmSync(entry, { recursive: true });
      } else {
        fs.unlinkSync(entry);
      }
    }
  });
}
