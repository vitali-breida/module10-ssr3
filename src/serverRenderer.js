import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import createStore from './app/store';
import App from './App';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import routes from './routes';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable-ssr-addon';
import manifest from '../public/assets-manifest.json';

function renderHTML(html, preloadedState, cssMaterialUI, loadableStyles, loadableScripts) {
  return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset=utf-8>
          <title>Movies demo</title>
          <style id="jss-server-side">${cssMaterialUI}</style>

          ${loadableStyles.map(style => {
            return `<link href="/${style.file}" rel="stylesheet" />`;
          }).join('\n')}
        </head>
        <body>
          <div id="root">${html}</div>
          <script>
            // WARNING: See the following for security issues around embedding JSON in HTML:
            // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
            window.PRELOADED_STATE = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
          </script>
          ${loadableScripts.map(script => {
            return `<script src="/${script.file}"></script>`
          }).join('\n')}
        </body>
      </html>
  `;
}

export default function serverRenderer() {
  return (req, res) => {
    if (req.path.endsWith('/favicon.ico')) {
      return;
    }

    const store = createStore();
    const promises = [];

    routes.some(route => {
      const match = matchPath(req.path, route);
      if (match && !!route.loadData) promises.push(Promise.resolve(route.loadData(match, store)));
      return match;
    });

    Promise.all(promises).then(data => {
      const sheets = new ServerStyleSheets();
      const context = {};
      const modules = new Set();

      // This context object contains the results of the render
      const renderRoot = () => (
        sheets.collect(
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Loadable.Capture report={moduleName => modules.add(moduleName)}>
              <App
                context={context}
                location={req.url}
                Router={StaticRouter}
                store={store}
              />
            </Loadable.Capture>
          </ThemeProvider>
        )
      );

      renderToString(renderRoot());

      // context.url will contain the URL to redirect to if a <Redirect> was used
      if (context.url) {
        res.writeHead(302, {
          Location: context.url,
        });
        res.end();
        return;
      }

      const htmlString = renderToString(renderRoot());
      const preloadedState = store.getState();
      const cssMaterialUI = sheets.toString();

      // now we concatenate the loaded `modules` from react-loadable `Loadable.Capture` method
      // with our application entry point
      const modulesToBeLoaded = [...Array.from(modules), ...manifest.entrypoints]   
      const bundles = getBundles(manifest, modulesToBeLoaded);

      // so it's easy to implement it
      const loadableStyles = bundles.css || [];
      const loadableScripts = bundles.js || [];

      res.send(renderHTML(htmlString, preloadedState, cssMaterialUI, loadableStyles, loadableScripts));
    });
  };
}