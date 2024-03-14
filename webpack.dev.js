const path = require('path');
const common = require('./webpack.config');

module.exports = {
  ...common,
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    client: {
      overlay: true,
    },
    static: {
      directory: path.join(__dirname, 'www'),
    },
    server: 'https',
    devMiddleware: {
      publicPath: '/',
    },
    hot: false,
    setupMiddlewares(middlewares) {
      middlewares.push({
        name: 'add-cordova-js',
        middleware(req, res, next) {
          const url = req.originalUrl;
          const www = 'platforms/android/app/src/main/assets/www/';
          if (url === '/cordova.js') {
            const file = path.resolve(__dirname, www, 'cordova.js');
            res.sendFile(file);
            return;
          }
          if (url === '/cordova_plugins.js') {
            const file = path.resolve(__dirname, www, 'cordova_plugins.js');
            res.sendFile(file);
            return;
          }
          if (url === '/index.html') {
            const file = path.resolve(__dirname, www, 'index.html');
            res.sendFile(file);
            return;
          }
          next();
        },
      });
      return middlewares;
    },
  },
};
