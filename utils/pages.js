/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const files = [
  'js',
  'view.js',
  'scss',
];

const action = process.argv[2];
const name = process.argv[3];
const pagePath = path.resolve(__dirname, '../src/pages/');
const id = (new Date().getTime() + parseInt(Math.random() * 100000000000, 10)).toString(36);

if (!action) {
  console.error('Action is required');
  process.exit(1);
} else if (!['add', 'remove'].includes(action)) {
  console.error('Invalid action');
  process.exit(1);
}

if (!name) {
  console.error('Page name is required.');
  process.exit(1);
} else if (!/^[a-z]+[a-z0-9_]+/i.test(name)) {
  console.error('Invalid page name');
  process.exit(1);
}

const page = path.join(pagePath, name);
const classname = name[0].toUpperCase() + name.slice(1);

const content = {
  'view.js': `export default <div>${name}</div>;\n`,
  scss: `#${id}{\n  position: relative;\n}`,
  js: `import './${name}.scss';\nimport Page from 'components/page/page';\nimport $view from './${name}.view';\n\nexport default function ${classname}() {\n  const PAGE_ID = '${id}';\n  const $page = Page('${classname}', {\n    id: PAGE_ID,\n    secondary: true,\n  });\n\n  // Setting page content\n  $page.content = $view;\n\n  // Rendering the page\n  app.append($page);\n}\n`,
};

if (action === 'remove') {
  if (fs.existsSync(page)) {
    fs.rmSync(page, {
      recursive: true,
    });
  }

  console.log('Page removed successfully.');
} else if (action === 'add') {
  fs.mkdirSync(page);
  files.forEach((file) => {
    const filePath = path.join(page, [name, file].join('.'));
    fs.writeFileSync(filePath, content[file], 'utf8');
  });

  console.log('Page added successfully.');
}
