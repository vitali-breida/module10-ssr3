import App from "./App";
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import createStore from './app/store';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import { loadableReady } from '@loadable/component'

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
      <CssBaseline />
      <App
        Router={BrowserRouter}
        store={store}
      />
    </ThemeProvider>
  );
}

loadableReady(() => {
  hydrate(<Main />, rootElement)
})

