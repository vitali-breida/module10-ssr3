import React from 'react';
import { Box, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { dialogAddMovie } from '../../features/dialogsSlice';

export default function AddMovieButton() {
  const dispatch = useDispatch();

  return (
    <>
      <Box display="flex" justifyContent="flex-end">
        <Button onClick={() => dispatch(dialogAddMovie('open'))}>
          + Add movie
        </Button>
      </Box>
    </>
  );
}
