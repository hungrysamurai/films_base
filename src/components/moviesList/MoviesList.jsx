import SingleMovie from "./SingleMovie";
import Loader from "../Loader";


import { useGlobalContext } from "../../contexts/GlobalContext";
import { useEffect, useLayoutEffect, useState } from "react";

const MoviesList = () => {
  const { moviesFetchLoading, moviesFetchError, dispatch, moviesList, lastPage } =
    useGlobalContext();

  const [currentList, setCurrentList] = useState([]);
  const [newMovies, setNewMovies] = useState(false);

  useLayoutEffect(() => {
  setCurrentList(moviesList);
  }, [moviesList]);

  // get next portion of movies
  useEffect(() => {

    if(lastPage){
      console.log('this is the end');
    } else {
      dispatch({type: 'INCREASE_PAGE'});
    }

},[newMovies, dispatch, lastPage])

// scroll trigger
 const event = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 200) {
      console.log('reach');
      setNewMovies((prev) => !prev);
    }
  }

  // scroll event listener
 useEffect(() => {
    window.addEventListener('scroll', event);
    return () => window.removeEventListener('scroll', event)
  }, [])

  return (
    <>
    <div className="movies-list-container">
      {currentList.map(({ posterUrl, title, id }) => {
        if (title.length > 35) {
          title = title.slice(0, 35) + "...";
        }

        return <SingleMovie key={id} poster={posterUrl} title={title} />;
      })}
      
      
    </div>

    {moviesFetchLoading && <Loader/> }
    
    </>
  );
};

export default MoviesList;
