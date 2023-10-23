/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const liveServer = require('live-server');
const updateConfig = require('./updateConfig');

const serverCrt = path.resolve(__dirname, 'server.crt');
const serverKey = path.resolve(__dirname, 'server.key');

main();

async function main() {
  const { ip: host, port } = await updateConfig('dev');
  let appRan = false;
  liveServer.start({
    open: false,
    host,
    port,
    root: path.resolve(__dirname, '../www'),
    ignore: 'node_modules,platforms,plugins',
    file: 'index.html',
    https: {
      cert: fs.readFileSync(serverCrt),
      key: fs.readFileSync(serverKey),
      passphrase: '1234',
    },
    middleware: [(req, res, next) => {
      const url = req.originalUrl;
      const www = '../platforms/android/app/src/main/assets/www/';

      if (url === '/cordova.js') {
        const file = path.resolve(__dirname, www, 'cordova.js');
        sendFile(res, file);
        return;
      }

      if (url === '/cordova_plugins.js') {
        const file = path.resolve(__dirname, www, 'cordova_plugins.js');
        sendFile(res, file);
        return;
      }

      next();
    }],
  });

  const webpack = exec('npx webpack --progress --mode=development --watch', onError);
  webpack.stdout.on('data', (chunk) => {
    console.log(chunk);
    if (appRan) return;
    appRan = true;
    exec('cordova run android', onError);
  });

}

function onError(error) {
  if (!error) return;
  console.error(error);
  process.exit(1);
}

function sendFile(res, filePath) {
  if (fs.existsSync(filePath)) {
    const stat = fs.statSync(filePath);

    res.writeHead(200, {
      'Content-Type': 'application/javascript',
      'Content-Length': stat.size,
    });

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end(`ERROR cannot get ${filePath}`);
}
