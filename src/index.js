import App from "./App";
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './app/store'

const rootElement = document.getElementById("root");
const store = configureStore(window.PRELOADED_STATE);

const app =() => (
  <App
    Router={BrowserRouter}
    store={store}
  />
)

hydrate(app, rootElement);