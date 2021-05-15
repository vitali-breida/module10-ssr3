import HomePage from './app/Pages/HomePage';
import PageNotFound from './app/Pages/PageNotFound';
import { searchMovies, fetchMovies } from './features/moviesSlice';
import { infoMode } from './features/dialogsSlice';

const routes = [
  {
    path: '/',
    exact: true,
    component: HomePage,
    loadData: (match, store) => store.dispatch(fetchMovies())
  },
  {
    path: '/search/:keyword',
    component: HomePage,
    loadData: (match, store) => {
      const { keyword } = match.params;
      store.dispatch(searchMovies(keyword));
      return store.dispatch(fetchMovies());
    }
  },
  {
    path: '/film/:id',
    component: HomePage,
    loadData: (match, store) => {
      const { id } = match.params;
      store.dispatch(
        infoMode({
          mode: 'on',
          id: parseInt(id, 10)
        })
      );
      return store.dispatch(fetchMovies());
    }
  },
  {
    path: '*',
    component: PageNotFound
  }
];

export default routes;
