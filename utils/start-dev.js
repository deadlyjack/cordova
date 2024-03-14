/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const { exec } = require('child_process');
const updateConfig = require('./updateConfig');

const args = process.argv.slice(2);
let platform = args[0] || 'android';
let device = args[1] || 'device';

if (['device', 'emulator'].includes(platform)) {
  device = platform;
  platform = 'android';
}

main();

async function main() {
  const { port } = await updateConfig('dev');
  let appRan = false;

  const webpack = exec(
    `npx webpack serve --port ${port} --config webpack.dev.js`,
    onError,
  );
  webpack.stdout.on('data', (chunk) => {
    console.log(chunk);
    if (appRan) return;
    appRan = true;
    exec(`cordova run ${platform} --${device}`, onError);
  });
}

function onError(error) {
  if (!error) return;
  console.error(error);
  process.exit(1);
}
