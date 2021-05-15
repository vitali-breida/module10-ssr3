/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

require('isomorphic-fetch');

// configuration
const serverUrl = 'http://localhost:4000/movies';
const sortByDefault = 'vote_average';

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async (dispatch, thunkAPI) => {
  let url = serverUrl;
  const state = thunkAPI.getState();

  // sorting
  let { sortBy } = state.movies;
  if (!sortBy) {
    sortBy = sortByDefault;
  }
  url += `?sortBy=${sortBy}&sortOrder=asc`;

  // filtering
  const { filterBy } = state.movies;
  if (filterBy.length > 0) {
    url += `&filter=${filterBy.join('%2C')}`;
  }

  // search
  const { search } = state.movies;
  if (search !== '') {
    url += `&search=${search}&searchBy=title`;
  }

  // pagination
  url += '&offset=0&limit=6';

  const response = await fetch(url);
  const movies = response.json();
  return movies;
});

export const addMovie = createAsyncThunk('movies/addMovie', async (payload) => {
  const response = await fetch(serverUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const json = await response.json();
  if (json.messages) {
    throw new Error(json.messages);
  } else return json;
});

export const editMovie = createAsyncThunk(
  'movies/editMovie',
  async (payload) => {
    const response = await fetch(serverUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const json = await response.json();
    if (json.messages) {
      throw new Error(json.messages);
    } else return json;
  }
);

export const deleteMovie = createAsyncThunk(
  'movies/deleteMovie',
  async (movieId) => {
    await fetch(`${serverUrl}/${movieId}`, {
      method: 'DELETE'
    });
    return movieId;
  }
);

export const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    list: [],
    sortBy: sortByDefault,
    totalCount: 0,
    filterBy: [],
    search: '',
    fetchWasRun: false
  },
  reducers: {
    sortMovies: (state, action) => {
      state.sortBy = action.payload;
    },
    searchMovies: (state, action) => {
      state.search = action.payload;
    },
    filterMovies: (state, action) => {
      const f = action.payload;

      if (state.filterBy.includes(f)) {
        state.filterBy = state.filterBy.filter((el) => el !== f);
      } else {
        state.filterBy.push(f);
      }
    },
    skipFiltering: (state) => {
      state.filterBy = [];
    }
  },
  extraReducers: {
    [fetchMovies.fulfilled]: (state, action) => {
      state.list = action.payload.data;
      state.totalCount = action.payload.totalAmount;
      state.fetchWasRun = true;
    },
    [addMovie.fulfilled]: (state, action) => {
      state.list.push(action.payload);
    },
    [addMovie.rejected]: (state, action) => {
      // eslint-disable-next-line no-console
      console.log('Add movie is rejected: ', action.error.message);
    },
    [editMovie.fulfilled]: (state, action) => {
      const index = state.list.findIndex((el) => el.id === action.payload.id);
      state.list[index] = action.payload;
    },
    [deleteMovie.fulfilled]: (state, action) => {
      state.list = state.list.filter((el) => el.id !== action.payload);
    }
  }
});

// action creators
export const {
  sortMovies,
  filterMovies,
  skipFiltering,
  searchMovies
} = moviesSlice.actions;

// Returns selected movie from the state
// eslint-disable-next-line max-len
export const selectSelectedMovie = (state) => state.movies.list.find((el) => el.id === state.dialogs.selectedMovieId);

// Returns edited movie from the state
// eslint-disable-next-line max-len
export const selectEditedMovie = (state) => state.movies.list.find((el) => el.id === state.dialogs.editedMovieId);
export const selectSortBy = (state) => state.movies.selectSortBy;

export default moviesSlice.reducer;
