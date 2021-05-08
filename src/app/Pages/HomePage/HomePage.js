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
  let fetchWasRun = useSelector((state) => state.movies.fetchWasRun);
  let { id /* film id */, keyword } = useParams();

  useEffect(() => {
    if (!!keyword) {
      dispatch(searchMovies(keyword));
      dispatch(fetchMovies());
    }

    if (!!id) {
      //check if fetch was before if open by direct link
      if (!fetchWasRun) {
        dispatch(fetchMovies());
      }
      dispatch(infoMode({ mode: "on", id: parseInt(id, 10) }));
    }
  }, [keyword, id, dispatch, fetchWasRun]);

  return (
    <>
      <Header />
      <Body />
      <Footer />
    </>
  );
};
