import Grid from '@material-ui/core/Grid';
import { useSelector } from 'react-redux';
import AddMovieButton from '../Components/AddMovieButton';
import Search from '../Components/Search';
import MovieInfo from '../Components/MovieInfo';
import Logo from '../Components/Logo';
import SearchIcon from '../Components/SearchIcon';
import { selectIsMovieInfoMode } from '../../features/dialogsSlice';

export default function Header() {
  const isInfoMode = useSelector(selectIsMovieInfoMode);

  return (
    <>
      {isInfoMode ? (
        <>
          <Grid container>
            <Grid item xs={10}>
              <Logo />
            </Grid>
            <Grid item xs={2}>
              <SearchIcon />
            </Grid>
          </Grid>
          <MovieInfo />
        </>
      ) : (
        <>
          <Logo />
          <AddMovieButton />
          <Search />
        </>
      )}
    </>
  );
}
