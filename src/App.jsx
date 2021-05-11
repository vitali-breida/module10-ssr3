/* eslint-disable react/prop-types */
import './styles.css';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
// import { StrictMode } from 'react';
import { hot } from 'react-hot-loader/root';
import loadable from '@loadable/component';
import routes from './routes';

const AddMovieDialog = loadable(() => import('./app/Components/AddMovieDialog'));
const EditMovieDialog = loadable(() => import('./app/Components/EditMovieDialog'));
const DeleteMovieDialog = loadable(() => import('./app/Components/DeleteMovieDialog'));

const App = ({
  Router, location, context, store
}) => (
  // <StrictMode>
  <Provider store={store}>
    <Router location={location} context={context}>
      <AddMovieDialog />
      <EditMovieDialog />
      <DeleteMovieDialog />

      <Switch>
        {routes.map((route, i) => (
          <Route
            key={route.key || i}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        ))}
      </Switch>
    </Router>
  </Provider>
  // </StrictMode>
);

App.defaultProps = {
  location: null,
  context: null
};

export default hot(App);
