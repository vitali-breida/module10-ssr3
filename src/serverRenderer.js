import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import createStore from './app/store';
import App from './App';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ServerStyleSheets, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

function renderHTML(html, preloadedState, css) {
  return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset=utf-8>
          <title>Movies demo</title>
          <style id="jss-server-side">${css}</style>
          <link href="/css/main.css" rel="stylesheet" type="text/css">
        </head>
        <body>
          <div id="root">${html}</div>
          <script>
            // WARNING: See the following for security issues around embedding JSON in HTML:
            // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
            window.PRELOADED_STATE = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
          </script>
          <!--script async src="/js/main.js"></script-->
        </body>
      </html>
  `;
}

export default function serverRenderer() {
  return (req, res) => {
    const sheets = new ServerStyleSheets();
  
    // Create a theme instance.
    const theme = createMuiTheme({
      palette: {
        primary: green,
        accent: red,
        type: 'light',
      },
    });
  
    const store = createStore();

    // This context object contains the results of the render
    const context = {};
    const renderRoot = () => (
      sheets.collect(
        <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
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
  };
}
