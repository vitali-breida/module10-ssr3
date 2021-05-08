import { matchPath } from 'react-router';
import HomePage from './app/Pages/HomePage/HomePage';
import PageNotFound from './app/Pages/PageNotFound/PageNotFound';
import {
    searchMovies,
    fetchMovies
} from "./features/movies/moviesSlice";

const routes = [
    {
        path: '/',
        exact: true,
        component: HomePage
    },
    {
        path: '/search/:keyword',
        component: HomePage,
        loadData: (match, store) => {
            const keyword = match.params.keyword;
            store.dispatch(searchMovies(keyword));
            return store.dispatch(fetchMovies());
        }
    },
    {
        path: '/film/:id',
        component: HomePage
    },
    {
        path: '*',
        component: PageNotFound
    },
];

export default routes;
