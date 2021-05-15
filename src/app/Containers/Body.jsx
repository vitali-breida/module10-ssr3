import Box from '@material-ui/core/Box';
import { useSelector } from 'react-redux';
import ResultsCount from '../Components/ResultsCount';
import ResultsFilter from '../Components/ResultsFilter';
import ResultsSort from '../Components/ResultsSort';
import ResultsBody from './ResultsBody';
import NoMovieFound from '../Components/NoMovieFound';

export default function Body() {
  const totalCount = useSelector((state) => state.movies.totalCount);
  return (
    <>
      <Box display="flex">
        <Box width="50%">
          <ResultsFilter />
        </Box>
        <Box width="50%" display="flex" justifyContent="flex-end">
          <ResultsSort />
        </Box>
      </Box>

      {totalCount > 0 ? (
        <>
          <ResultsCount />
          <ResultsBody />
        </>
      ) : (
        <NoMovieFound />
      )}
    </>
  );
}