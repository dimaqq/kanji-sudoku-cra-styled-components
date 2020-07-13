const process = require("process");
const immer = require("immer");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const stats = process.argv.includes("--stats");
const revision = process.env.GIT_SHA1 || "local";

// https://github.com/immerjs/immer/issues/591
immer.setAutoFreeze(false);

module.exports = (config, env) => immer.produce(config, draft => {
  // By default CRA thinks that SVG files will be tiled into a single SVG map.
  // Thus, they are excluded from data URI conversion.
  //
  // I want SVG to be embedded into the bundle as data URI.
  // Here, I'm adding SVG filename pattern to same place here GIF, JPEG and PNG are.
  //
  // https://github.com/facebook/create-react-app/issues/7581#issuecomment-535305630
  const loaders = draft.module.rules.find(r => r.oneOf).oneOf;
  loaders.find(o => o?.loader.match(/url-loader/)).test.push(/[.]svg$/);

  // Tell webpack to pass babel configuration to babel
  //
  // https://github.com/facebook/create-react-app/blob/a2ae8a79c0f6c0d07c6c2f1155d63f10efce9089/packages/react-scripts/config/webpack.config.js#L361
  loaders.find(o => o?.options?.babelrc === false).options.babelrc = true;

  // Remove workbox plugin
  draft.plugins = draft.plugins.filter(p => p.constructor.name !== "GenerateSW");

  // Remove asset-manifest.json
  draft.plugins = draft.plugins.filter(p => p.constructor.name !== "ManifestPlugin");

  // Remove the plugin that inlines "main" js into index.html for cleaner CSP
  draft.plugins = draft.plugins.filter(p => p.constructor.name !== "InlineChunkHtmlPlugin");

  draft.plugins.find(p => p.constructor.name === "HtmlWebpackPlugin").options.revision = revision;

  if (stats) draft.plugins.push(new BundleAnalyzerPlugin());

  // Webpack tree-shaking is performed on the level of modules.
  // Thus, if anything from a module is imported, the entire module is bundled in.
  // The below allows to create 2 versions of the same component: something for dev and empty for prod.
  draft.resolve.alias.dev = `dev/${ env }`;

  // Debug only
  // console.log(JSON.stringify(draft, null, 2));
});
