import React, { useState } from "react";
import { Menu, MenuItem } from "@material-ui/core";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
  dialogDeleteMovie,
  dialogEditMovie,
  selectIsMovieInfoMode,
  selectSelectedMovieId
} from "../../../features/dialogs/dialogsSlice";
import { useHistory } from "react-router-dom";

export default function MovieImage(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const isInfoMode = useSelector(selectIsMovieInfoMode);
  const selectedMovieId = useSelector(selectSelectedMovieId);
  const history = useHistory();

  const showMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const closeMenu = (e) => {
    setAnchorEl(null);
  };

  const handleClick = (e) => {
    if (!isInfoMode || props.movieId !== selectedMovieId) {
      let nextUrl = "/film/".concat(props.movieId);

      if (history.location.pathname.startsWith("/film")) {
        history.replace(nextUrl);
      } else {
        history.push(nextUrl);
      }
    } else {
      showMenu(e);
    }
  };

  const handleChooseEdit = (e) => {
    dispatch(dialogEditMovie({ operation: "open", id: props.movieId }));
    closeMenu(e);
  };

  const handleChooseDelete = (e) => {
    dispatch(dialogDeleteMovie({ operation: "open", id: props.movieId }));
    closeMenu(e);
  };

  return (
    <>
      <img
        alt="Poster"
        src={props.imageUrl}
        height="300"
        onClick={handleClick}
      />
      <Menu
        id="movie-context-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        <MenuItem onClick={handleChooseEdit}>Edit</MenuItem>
        <MenuItem onClick={handleChooseDelete}>Delete</MenuItem>
      </Menu>
    </>
  );
}

MovieImage.propTypes = {
  movieId: PropTypes.number.isRequired,
  imageUrl: PropTypes.string
};
