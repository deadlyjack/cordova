const fs = require('fs');
const path = require('path');

const files = [
  'hbs',
  'js',
  'include.js',
  'scss',
];

const action = process.argv[2];
const name = process.argv[3];
const pagePath = path.resolve(__dirname, '../src/pages/');
const id = (new Date().getTime() + parseInt(Math.random() * 100000000000)).toString(36);

if (!action) {
  console.error("Action is required");
  process.exit(1);
} else if (!['add', 'remove'].includes(action)) {
  console.error("Invalid action");
  process.exit(1);
}

if (!name) {
  console.error("Page name is required.");
  process.exit(1);
} else if (!/^[a-z]+[a-z0-9_]+/i.test(name)) {
  console.error("Invalid page name");
  process.exit(1);
}

const page = path.join(pagePath, name);
const classname = name[0].toUpperCase() + name.slice(1);

const content = {
  'hbs': ``,
  'scss': `#${id}{\r\n  position: relative;\r\n}`,
  'js': `// jshint ignore:start\r\n\r\nexport default function ${classname}(args) {\r\n  import( /* webpackChunkName: \"${name}\" */ './${name}.include')\r\n    .then(module => {\r\n      const ${name} = module.default;\r\n      ${name}(args);\r\n    });\r\n}`,
  'include.js': `import './${name}.scss';\r\nimport $_page from './${name}.hbs';\r\nimport Page from \"../../components/page/page\";\r\n\r\nexport default function ${classname}Include() {\r\n  const $page = Page('${classname}', {\r\n    id: '${id}',\r\n    secondary: true\r\n  });\r\n  $page.content = $_page;\r\n  $page.render();\r\n}`
};

if (action === "remove") {
  if (fs.existsSync(page)) fs.rmdirSync(page, {
    recursive: true
  });

  console.log("Page removed successfully.");
} else if (action === "add") {
  fs.mkdirSync(page);
  for (let file of files) {
    const filePath = path.join(page, [name, file].join('.'));
    fs.writeFileSync(filePath, content[file], 'utf8');
  }

  console.log("Page added successfully.");
}