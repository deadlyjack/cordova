const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, options) => {
  const WWW = path.resolve(__dirname, 'www');
  const SRC = path.resolve(__dirname, 'src');
  const { mode = 'development' } = options;
  const IS_DEVELOPMENT = mode === 'development';
  clearOutputDir();

  const rules = [
    {
      test: /\.(hbs)$/,
      use: ['raw-loader'],
    },
    {
      test: /\.(sa|sc|c)ss$/,
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
      loader: 'file-loader',
      options: {
        outputPath(url, res) {
          res = path.relative(WWW, res.replace(SRC, WWW));
          return res.replace(/\\/g, '/');
        },
        name: '[name].[ext]',
        publicPath(...args) {
          return this.outputPath(...args);
        },
      },
    },
  ];

  const babel = {
    test: /\.m?js$/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
      },
    },
  };

  if (!IS_DEVELOPMENT) {
    rules.push(babel);
  }

  const mainConfig = {
    stats: 'minimal',
    watchOptions: {
      ignored: ['**/node_modules', '**/server', '**/public', '**/tools'],
    },
    mode,
    entry: {
      main: './src/main.js',
      // sw: './src/sw.js',
    },
    output: {
      path: WWW,
      filename: '[name].js',
      chunkFilename: '[name].chunk.js',
      publicPath: './',
    },
    module: {
      rules,
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

  return [mainConfig];
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
  const WWW = path.resolve(__dirname, 'www');
  const files = fs.readdirSync(WWW);
  files.forEach((file) => {
    if (file !== 'index.html') {
      const entry = path.join(WWW, file);
      if (fs.statSync(entry).isDirectory()) {
        fs.rmdirSync(entry, { recursive: true });
      } else {
        fs.unlinkSync(entry);
      }
    }
  });
}
