import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { loadableReady } from '@loadable/component';
import theme from './theme';
import createStore from './app/store';
import App from './App';

const rootElement = document.getElementById('root');
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
      <CssBaseline />
      <App
        Router={BrowserRouter}
        store={store}
      />
    </ThemeProvider>
  );
}

loadableReady(() => {
  hydrate(<Main />, rootElement);
});
