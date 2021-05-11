import { useSelector } from 'react-redux';

export default function ResultsCount() {
  const count = useSelector((state) => state.movies.totalCount);
  return (
    <div>
      {count}
      {' '}
      movies found
    </div>
  );
}
