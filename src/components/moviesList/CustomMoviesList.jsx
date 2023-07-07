import SingleMovie from "./SingleMovie";
import Loader from "../Loader";
import ErrorMessage from "../ErrorMessage";

import { motion, AnimatePresence } from "framer-motion";

import { useGlobalContext } from "../../contexts/GlobalContext";

import { useFetchCustomMoviesList } from "../../hooks/useFetchCustomMoviesList";
import { useEffect, useState, useReducer } from "react";

const CustomMoviesList = ({listMode, data}) => {
  // const { lang } = useGlobalContext();

  const {
   data: moviesFetchList,
   isLoading: moviesFetchLoading, 
   error: moviesFetchError
  } = useFetchCustomMoviesList(
   'ru',
   listMode,
   data
  );

  if (moviesFetchError.show) {
    return (
      <ErrorMessage
        errorMessage={moviesFetchError.message}
        componentMessage="Ошибка при загрузке списка"
        showImage={true}
      />
    );
  }
  if (moviesFetchLoading) {
    return (
      <Loader/>
    );
  }

  return (
    <>
      <motion.div layout layoutRoot className="movies-list-container">
        {moviesFetchList.map(({ posterUrl, title, id, mediaType }) => {
          if (title.length > 35) {
            title = title.slice(0, 35) + "...";
          }
          
          return (
            <AnimatePresence key={id}>
              <SingleMovie poster={posterUrl} title={title} id={id} mediaType={mediaType}/>;
            </AnimatePresence>
          );
        })}
      </motion.div>

      {/* {moviesFetchLoading && <Loader />} */}
    </>
  );
};

export default CustomMoviesList;
