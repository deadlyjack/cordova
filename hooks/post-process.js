/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');

const buildFilePath = path.resolve(__dirname, '../build.json');
const copyToPath = path.resolve(__dirname, '../platforms/android/build.json');
const resPath = path.resolve(__dirname, '../platforms/android/app/src/main/res/');
const localResPath = path.resolve(__dirname, '../res/android/');
// const themeXML = path.resolve(__dirname, localResPath, 'values', 'themes.xml');
// const manifestXML = path.resolve(__dirname, resPath, '..', 'AndroidManifest.xml');
// const manifestXMLContent = fs.readFileSync(manifestXML, 'utf8');
// const themeXMLContent = fs.readFileSync(themeXML, 'utf8');
// const themeRegex = /<style\s+name\s*=\s*"(.+)"\s+.*>/;
// const theme = themeRegex.exec(themeXMLContent)[1];
// const newManifestXMLContent = manifestXMLContent.replace(
//   /android:theme\s*=\s*"(.+)"\s+/,
//   `android:theme="${theme}" `,
// );

if (
  !fs.existsSync(copyToPath)
  && fs.existsSync(buildFilePath)
) fs.copyFileSync(buildFilePath, copyToPath);

deleteDirRecursively(resPath, ['values/strings.xml', 'values/colors.xml', 'xml']);
copyDirRecursively(localResPath, resPath);

// log in cyan
// console.log('\x1b[36m%s\x1b[0m', 'using theme: ', theme);
// fs.writeFileSync(manifestXML, newManifestXMLContent);

/**
 * Copy directory recursively
 * @param {string} src Source directory
 * @param {string} dest Destination directory
 * @param {string[]} skip Files to not copy
 */
function copyDirRecursively(src, dest, skip = [], currPath = '') {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (!exists) {
    console.log(`File ${src} does not exist`);
    return;
  }

  if (!fs.existsSync(dest) && isDirectory) {
    fs.mkdirSync(dest);
  }

  if (exists && isDirectory) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach((childItemName) => {
      const relativePath = path.join(currPath, childItemName);
      if (childItemName.startsWith('.')) return;
      if (skip.includes(childItemName) || skip.includes(relativePath)) return;
      copyDirRecursively(
        path.join(src, childItemName),
        path.join(dest, childItemName),
        skip,
        childItemName,
      );
    });
  } else {
    fs.copyFileSync(src, dest);

    // log
    const message = `copied: ${path.basename(src)}`;
    console.log('\x1b[32m%s\x1b[0m', message); // green
  }
}

/**
 * Delete directory recursively
 * @param {string} dir Directory to delete
 * @param {string[]} except Files to not delete
 */
function deleteDirRecursively(dir, except = [], currPath = '') {
  const exists = fs.existsSync(dir);
  const stats = exists && fs.statSync(dir);
  const isDirectory = exists && stats.isDirectory();

  if (!exists) {
    console.log(`File ${dir} does not exist`);
    return;
  }

  if (exists && isDirectory) {
    let deleteDir = true;
    fs.readdirSync(dir).forEach((childItemName) => {
      const relativePath = path.join(currPath, childItemName);
      const setDeleteDir = deleteDir;

      if (setDeleteDir) deleteDir = false;
      if (childItemName.startsWith('.')) return;
      if (except.includes(childItemName) || except.includes(relativePath)) {
        console.log('\x1b[33m%s\x1b[0m', `skipped: ${relativePath}`); // yellow
        return;
      }
      if (setDeleteDir) deleteDir = true;

      deleteDirRecursively(
        path.join(dir, childItemName),
        except,
        childItemName,
      );
    });
    if (deleteDir) {
      console.log('\x1b[31m%s\x1b[0m', `deleted: ${currPath || path.basename(dir)}`); // red
      fs.rmSync(dir, { recursive: true });
    }
  } else {
    fs.rmSync(dir);
  }
}
