import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Header from '../Containers/Header';
import Footer from '../Containers/Footer';
import Body from '../Containers/Body';
import { searchMovies, fetchMovies } from '../../features/moviesSlice';
import { infoMode } from '../../features/dialogsSlice';

export default function HomePage() {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.movies.search);
  const { id /* film id */, keyword } = useParams();

  useEffect(() => {
    if (!!keyword && (keyword !== search)) {
      dispatch(searchMovies(keyword));
      dispatch(fetchMovies());
    }

    if (id) {
      dispatch(infoMode({ mode: 'on', id: parseInt(id, 10) }));
    }
  }, [keyword, id, dispatch, search]);

  return (
    <>
      <Header />
      <Body />
      <Footer />
    </>
  );
}
