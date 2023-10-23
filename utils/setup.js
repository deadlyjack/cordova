/* eslint-disable no-console */
const { exec } = require('child_process');

console.log('Running npm install...');
exec('npm install', (error) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }

  console.log('Add android...');
  exec('npm run clean', (cleanError) => {
    if (cleanError) {
      console.error(cleanError);
      process.exit(1);
    }

    console.log('Android added.');
    console.log('Installing native plugin.');
    exec('cordova plugin add ./native', (pluginError) => {
      if (pluginError) {
        console.error(pluginError);
        process.exit(1);
      }
      console.log('Native plugin installed.');
    });
  });
});
