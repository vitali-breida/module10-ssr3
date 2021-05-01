import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  selectIsDeleteMovieDialogVisible,
  selectEditedMovieId,
  dialogDeleteMovie,
  infoMode
} from "../../../features/dialogs/dialogsSlice";
import { deleteMovie } from "../../../features/movies/moviesSlice";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useHistory } from "react-router-dom";

export default function DeleteMovieDialog(props) {
  const isDeleteMovieDialogVisible = useSelector(
    selectIsDeleteMovieDialogVisible
  );
  const movieId = useSelector(selectEditedMovieId);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClose = (e) => {
    dispatch(dialogDeleteMovie("close"));
    dispatch(infoMode({ mode: "off" }));
  };

  const handleDelete = (e) => {
    const resultAction = dispatch(deleteMovie(movieId));
    unwrapResult(resultAction);
    handleClose(e);
    history.goBack();
  };

  return (
    <div>
      <Dialog
        open={isDeleteMovieDialogVisible}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">DELETE MOVIE</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this movie?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
