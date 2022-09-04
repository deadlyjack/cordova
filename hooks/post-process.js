/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');

const buildFilePath = path.resolve(__dirname, '../build.json');
const copytToPath = path.resolve(__dirname, '../platforms/android/build.json');
const resPath = path.resolve(__dirname, '../platforms/android/app/src/main/res/');

const exclude = ['xml', 'values'];
const splashScreens = fs.readdirSync(resPath).filter((dir) => !exclude.includes(dir));

if (
  !fs.existsSync(copytToPath)
  && fs.existsSync(buildFilePath)
) fs.copyFileSync(buildFilePath, copytToPath);

splashScreens.forEach((i) => {
  const file = path.join(resPath, i);
  if (fs.existsSync(file)) {
    fs.rmSync(file, {
      recursive: true,
    });
    console.log('Removed: ', i);
  }
});

require('./copy-resources');
