import Header from "../../Containers/Header/Header";
import Footer from "../../Containers/Footer/Footer";
import Body from "../../Containers/Body/Body";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  searchMovies,
  fetchMovies
} from "../../../features/movies/moviesSlice";
import { infoMode } from "../../../features/dialogs/dialogsSlice";
import { useEffect } from "react";

export default () => {
  let dispatch = useDispatch();
  // let fetchWasRun = useSelector((state) => state.movies.fetchWasRun);
  let search = useSelector((state) => state.movies.search);
  let { id /* film id */, keyword } = useParams();

  useEffect(() => {
    if (!!keyword && (keyword !== search)) {
      dispatch(searchMovies(keyword));
      dispatch(fetchMovies());
    }

    if (!!id) {
       dispatch(infoMode({ mode: "on", id: parseInt(id, 10) }));
    }
   }, [keyword, id, dispatch, search]);

  return (
    <>
      <Header />
      <Body />
      <Footer />
    </>
  );
};
