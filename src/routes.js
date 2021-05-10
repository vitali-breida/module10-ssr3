import HomePage from './app/Pages/HomePage/HomePage';
import PageNotFound from './app/Pages/PageNotFound/PageNotFound';
import {
    searchMovies,
    fetchMovies
} from "./features/movies/moviesSlice";
import { infoMode } from "./features/dialogs/dialogsSlice";

const routes = [
    {
        path: '/',
        exact: true,
        component: HomePage,
        loadData: (match, store) => {
            return store.dispatch(fetchMovies());
        }
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
        component: HomePage,
        loadData: (match, store) => {
            const id = match.params.id;
            store.dispatch(infoMode({ mode: "on", id: parseInt(id, 10) }));
            return store.dispatch(fetchMovies());
        }
    },
    {
        path: '*',
        component: PageNotFound
    },
];

export default routes;