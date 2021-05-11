import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovies, selectSortBy, sortMovies } from '../../features/moviesSlice';

export default function ResultsSort() {
  const [anchorEl, setAnchorEl] = useState(null);
  const sortBy = useSelector(selectSortBy);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSort = (e) => {
    dispatch(sortMovies(e.currentTarget.dataset.value));
    dispatch(fetchMovies());
    handleClose(e);
  };

  return (
    <>
      <Menu
        id="menu-sort-by"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem data-value="release_date" onClick={handleSort}>
          Release Date
        </MenuItem>
        <MenuItem data-value="vote_average" onClick={handleSort}>
          Rating
        </MenuItem>
        <MenuItem data-value="genres" onClick={handleSort}>
          Genre
        </MenuItem>
      </Menu>
      <Button onClick={handleClick}>SortBy</Button>
      <Button disabled>{sortBy}</Button>
    </>
  );
}
