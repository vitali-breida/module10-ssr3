const app = require('./app');
const port = process.env.PORT || 8080;
const Loadable= require('react-loadable');

Loadable.preloadAll().then(() => {
  app.listen(port, () => {
    console.info(`Express listening on port ${port}`); // eslint-disable-line
  })
});