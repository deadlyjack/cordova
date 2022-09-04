const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, options) => {
  const WWW = path.resolve(__dirname, 'www');
  const { mode = 'development' } = options;
  // const IS_DEVELOPMENT = mode === 'development';
  clearOutputDir();

  const rules = [
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
  ];

  const mainConfig = {
    resolve: {
      alias: {
        res: path.resolve(__dirname, 'src/res'),
        pages: path.resolve(__dirname, 'src/pages'),
        plugins: path.resolve(__dirname, 'src/plugins'),
        components: path.resolve(__dirname, 'src/components'),
        utils: path.resolve(__dirname, 'src/utils'),
      },
    },
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
    if (!['index.html', 'favicon.ico'].includes(file)) {
      const entry = path.join(WWW, file);
      if (fs.statSync(entry).isDirectory()) {
        fs.rmSync(entry, { recursive: true });
      } else {
        fs.unlinkSync(entry);
      }
    }
  });
}
