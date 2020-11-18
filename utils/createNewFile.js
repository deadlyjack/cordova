const fs = require('fs');
const path = require('path');

const files = [
  '[file].hbs',
  '[file].js',
  '[file].include.js',
  '[file].scss',
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

const classname = name[0].toUpperCase() + name.slice(1);

const content = {
  html: `<div id='${id}'>

  </div>`,
  scss: `#${id}{
  
  }`,
  js: `// jshint ignore:start

  export default function ${classname}(args) {
    import( /* webpackChunkName: "${name}" */ './${name}.include')
      .then(module => {
        const ${name} = module.default;
        ${name}(args);
      });
  }`,
  include: `import './${name}.scss';
  import $_page from './${name}.hbs';
  import Page from "../../components/page/page";
  
  export default function ${classname}Include() {
    const $page = Page();
    $page.innerHTML = $_page;
    $page.render();
  }`
};

if (action === "remove") {
  const page = path.join(pagePath, name);
  if (fs.existsSync(page)) fs.rmdirSync(page, {
    recursive: true
  });
} else if (action === "add") {
  for (let file of files) {

  }
}