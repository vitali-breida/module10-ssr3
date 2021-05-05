import App from "./App";
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import createStore from './app/store';
import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

const rootElement = document.getElementById("root");
const store = createStore(window.PRELOADED_STATE);

function Main() {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <App
        Router={BrowserRouter}
        store={store}
      />
    </ThemeProvider>
  );
}

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: green,
    accent: red,
    type: 'light',
  },
});

hydrate(<Main/>, rootElement);