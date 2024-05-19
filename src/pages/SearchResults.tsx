import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { useAppDispatch } from '../store/hooks';
import { setMainTitle } from '../store/slices/mainSlice';

const SearchResults: React.FC = () => {
  const { query } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setMainTitle(query as string));
  }, [query]);

  return (
    <section className="section-search-results">{/* <MoviesList /> */}</section>
  );
};

export default SearchResults;
