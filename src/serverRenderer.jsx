import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core/styles';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import createStore from './app/store';
import App from './App';
import theme from './theme';
import routes from './routes';

const path = require('path');

function renderHTML(html, preloadedState, cssMaterialUI, styles, scripts) {
  return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset=utf-8>
          <title>Movies demo</title>
          <style id="jss-server-side">${cssMaterialUI}</style>
          ${styles}
        </head>
        <body>
          <div id="root">${html}</div>
          <script>
            // WARNING: See the following for security issues around embedding JSON in HTML:
            // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
            window.PRELOADED_STATE = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
          </script>
          ${scripts}
        </body>
      </html>
  `;
}

export default function serverRenderer() {
  return (req, res) => {
    if (req.path.endsWith('/favicon.ico')) {
      res.writeHead(200, { 'Content-Type': 'image/x-icon' });
      res.end();
      return;
    }

    const store = createStore();
    const promises = [];
    const statsFile = path.resolve('public/loadable-stats.json');
    const extractor = new ChunkExtractor({ statsFile, publicPath: '/' });

    routes.some((route) => {
      const match = matchPath(req.path, route);
      if (match && !!route.loadData) promises.push(Promise.resolve(route.loadData(match, store)));
      return match;
    });

    Promise.all(promises).then(() => {
      const sheets = new ServerStyleSheets();
      const context = {};
      const renderRoot = () => (
        sheets.collect(
          <ChunkExtractorManager extractor={extractor}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <App
                context={context}
                location={req.url}
                Router={StaticRouter}
                store={store}
              />
            </ThemeProvider>
          </ChunkExtractorManager>
        )
      );

      renderToString(renderRoot());

      if (context.url) {
        res.writeHead(302, {
          Location: context.url
        });
        res.end();
        return;
      }

      const htmlString = renderToString(renderRoot());
      const preloadedState = store.getState();
      const cssMaterialUI = sheets.toString();
      const scripts = extractor.getScriptTags();
      const styles = extractor.getStyleTags();

      res.send(renderHTML(htmlString, preloadedState, cssMaterialUI, styles, scripts));
    });
  };
}
