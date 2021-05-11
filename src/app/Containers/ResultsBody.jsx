import { GridList, GridListTile } from '@material-ui/core';
import { useSelector } from 'react-redux';
import MovieCard from './MovieCard';

export default function ResultsBody() {
  const movies = useSelector((state) => state.movies.list);

  return (
    <GridList cellHeight="auto" cols={3}>
      {movies.map((movie) => (
        <GridListTile key={movie.title}>
          <MovieCard
            movieId={movie.id}
            title={movie.title}
            genres={movie.genres}
            releaseDate={movie.release_date}
            imageUrl={movie.poster_path}
          />
        </GridListTile>
      ))}
    </GridList>
  );
}
