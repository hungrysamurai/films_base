import { useParams, useLocation } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useEffect, useState } from "react";

import { motion, useAnimation, AnimatePresence } from 'framer-motion';

import { useFetchSingleMovie } from "../hooks/useFetchSingleMovie";

import ImageGallery from "../components/moviePage/ImageGallery";
import Loader from "../components/Loader";
import Modal from "../components/moviePage/Modal";
import MoviePoster from "../components/moviePage/MoviePoster";

const MoviePage = () => {
  
  const { setCurrentTitle, lang, mediaType } = useGlobalContext();

  const { id } = useParams();
  const location = useLocation();
  const requestedMediaType = location.pathname.split('/')[1];

  const [modal, setModal] = useState({
    show: false,
    data: [],
    index: 0
  });

  const control = useAnimation();

  const {data, images, error, isLoading} = useFetchSingleMovie(mediaType === requestedMediaType ?
    mediaType : 
    requestedMediaType, 
    lang, 
    id);

  const {data:mediaData, description, title, poster} = data;
 
  useEffect(() => {
    if(isLoading){
      setCurrentTitle(() => '');
    } else {
      setCurrentTitle(title);
    }
  }, [title, setCurrentTitle, isLoading, lang]);

  useEffect(() => {
     control.start({
       x: `-${modal.index * 100}%`
    });
  },[modal.index, control])


  const openModal = (mode, data, imageIndex) => {
    if(mode === 'images'){
      setModal(() => {
        const images = data.map((item, i) => {
                return (
                  <div 
                  className="modal-image-container"
                  key={i}>
                    <img src={item} alt='gallery-image'/>
                  </div>
            )
        });
        return {show: true, data: images, index: imageIndex}
      })
    }
  }

  const hideModal = (target) => {
    if (target.classList.contains('modal-index-controls')){
      setModal((prev) => {
        return {
          ...prev,
          show: false
        }
      })
    }
  }

  const changeModalImage = (direction) => {
      let nextIndex;

      if(direction === 'next'){
        nextIndex = 
            modal.index === modal.data.length - 1 
            ? 0 
            : modal.index + 1;
      } else {
        nextIndex = 
        modal.index === 0 
            ? modal.data.length - 1 
            : modal.index - 1
      }

      setModal((prev) => {
        return {
          ...prev,
          index: nextIndex 
        }
      })
  }

  if(isLoading){
    return (
      <Loader/>
    )
  }

  return (
    <section className="section-single-movie">

      <AnimatePresence>

      {modal.show && 
          <Modal 
          hideModal={hideModal} 
          changeModalImage={changeModalImage}
          control={control}
          modal={modal}/>
      }

      </AnimatePresence>

      <div className="movie-wrapper">

        <div className="left-col">
          <MoviePoster image={poster}/>
        </div>
        
        <div className="right-col">
          <div className="data-container">
            {mediaData.map((dataItem, i) => {
              const [label, info] = Object.entries(dataItem)[0];
              return (
                <div className="data-item" key={i}>
                <span className="label">{label}</span>
              <span className="data-info">{info}</span>
                </div>
              )
            })}
           
          </div>
          <div className="description-container">
            <p>
             {description}
            </p>
          </div>

          <ImageGallery openModal={openModal} imagesArray={images}/>
        </div>
      </div>
    </section>
  );
};

export default MoviePage;
