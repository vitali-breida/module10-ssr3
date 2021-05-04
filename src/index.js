import store from "./app/store";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import App from "./App";
import { hydrate } from 'react-dom';

const rootElement = document.getElementById("root");

hydrate(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  rootElement
);
