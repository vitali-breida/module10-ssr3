/* eslint-disable global-require */
const express = require('express');

const app = express();

if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
  const webpackConfig = require('../webpack');

  const compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, {
    serverSideRender: true
  }));

  // NOTE: Only the client bundle needs to be passed to `webpack-hot-middleware`.
  app.use(webpackHotMiddleware(compiler.compilers.find((c) => c.name === 'client')));
  app.use(webpackHotServerMiddleware(compiler));
} else {
  // const CLIENT_ASSETS_DIR = path.join(__dirname, '../public');
  // const CLIENT_STATS_PATH = path.join(CLIENT_ASSETS_DIR, 'loadable-stats.json');
  // const SERVER_RENDERER_PATH = path.join(__dirname, '../public/js/serverRenderer.js').dafault;
  // const serverRenderer = require(SERVER_RENDERER_PATH);
  // const stats = require(CLIENT_STATS_PATH);
  // app.use(express.static(CLIENT_ASSETS_DIR));
  // app.use(serverRenderer(stats));

  const serverRenderer = require('../public/js/serverRenderer').default;

  app.use(express.static('public'));
  app.use(serverRenderer());
}

module.exports = app;
