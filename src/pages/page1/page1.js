// jshint ignore:start

export default function Page1(args) {
  import( /* webpackChunkName: "page1" */ './page1.include')
    .then(module => {
      const page1 = module.default;
      page1(args);
    });
}