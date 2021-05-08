import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import createStore from './app/store';
import App from './App';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import routes from './routes';

function renderHTML(html, preloadedState, css) {
  return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset=utf-8>
          <title>Movies demo</title>
          <style id="jss-server-side">${css}</style>
          ${process.env.NODE_ENV === 'development' ? '' : '<link href="/css/main.css" rel="stylesheet" type="text/css">'}
        </head>
        <body>
          <div id="root">${html}</div>
          <script>
            // WARNING: See the following for security issues around embedding JSON in HTML:
            // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
            window.PRELOADED_STATE = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
          </script>
          <script src="/js/main.js"></script>
        </body>
      </html>
  `;
}

export default function serverRenderer() {
  return (req, res) => {
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

      // This context object contains the results of the render
      const renderRoot = () => (
        sheets.collect(
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App
              context={context}
              location={req.url}
              Router={StaticRouter}
              store={store}
            />
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
      const css = sheets.toString();

      res.send(renderHTML(htmlString, preloadedState, css));
    });
  };
}