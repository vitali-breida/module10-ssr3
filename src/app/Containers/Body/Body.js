import ResultsCount from "../../Components/ResultsCount/ResultsCount";
import ResultsFilter from "../../Components/ResultsFilter/ResultsFilter";
import ResultsSort from "../../Components/ResultsSort/ResultsSort";
import ResultsBody from "../ResultsBody/ResultsBody";
import Box from "@material-ui/core/Box";
//import ErrorBoundary from "../../Components/ErrorBoundary/ErrorBoundary";
import { useSelector } from "react-redux";
import NoMovieFound from "../../Components/NoMovieFound/NoMovieFound";

export default function Body(props) {
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
