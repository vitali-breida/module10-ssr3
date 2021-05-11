import { FormGroup, FormControlLabel, Switch } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, filterMovies, skipFiltering } from '../../features/moviesSlice';

const filters = ['Documentary', 'Comedy', 'Horror', 'Crime'];
export default function ResultsFilter() {
  const dispatch = useDispatch();
  const filterBy = useSelector((state) => state.movies.filterBy);

  const handleClickAll = () => {
    dispatch(skipFiltering());
    dispatch(fetchMovies());
  };

  const handleClickFilter = (e, filter) => {
    dispatch(filterMovies(filter));
    dispatch(fetchMovies());
  };

  return (
    <FormGroup row>
      <FormControlLabel
        checked={filterBy.length === 0}
        disabled={filterBy.length === 0}
        control={<Switch name="All" onChange={handleClickAll} />}
        label="All"
      />
      {filters.map((filter) => (
        <FormControlLabel
          control={(
            <Switch
              key={filter}
              checked={filterBy.includes(filter)}
              name={filter}
              onChange={(e) => handleClickFilter(e, filter)}
            />
          )}
          label={filter}
          key={filter}
        />
      ))}
    </FormGroup>
  );
}
