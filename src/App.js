import "./styles.css";
import AddMovieDialog from "./app/Components/AddMovieDialog/AddMovieDialog";
import EditMovieDialog from "./app/Components/EditMovieDialog/EditMovieDialog";
import DeleteMovieDialog from "./app/Components/DeleteMovieDialog/DeleteMovieDialog";
import { Switch, Route } from "react-router-dom";
import PageNotFound from "./app/Pages/PageNotFound/PageNotFound";
import HomePage from "./app/Pages/HomePage/HomePage";
import { Provider } from "react-redux";
import { StrictMode } from "react";
import { hot } from 'react-hot-loader/root';

const App = ({Router, location, context, store}) => {
  return (
    // <StrictMode>
      <Provider store={store}>
        <Router location={location} context={context}>
          <AddMovieDialog />
          <EditMovieDialog />
          <DeleteMovieDialog />

          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/search/:keyword" component={HomePage} />
            <Route path="/film/:id" component={HomePage} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </Router>
      </Provider>
    // </StrictMode>
    )
}

App.defaultProps = {
  location: null,
  context: null,
};

export default hot(App);