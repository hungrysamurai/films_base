import { useParams, useLocation } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useEffect, useState } from "react";

import { motion, useAnimation, AnimatePresence } from 'framer-motion';

import { useFetchSingleMovie } from "../hooks/useFetchSingleMovie";

import ImageGallery from "../components/moviePage/ImageGallery";
import Loader from "../components/Loader";

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
      <motion.div 
        animate={{opacity: 1}}
        initial={{opacity:0}}
        exit={{opacity: 0}}
        className="modal-container" 
        onClick={(e) => {
          hideModal(e.target)
        }}>

        <div className="modal-index-controls">

          <div className="prev-btn" onClick={() => {
            changeModalImage('prev')
          }}>

            <svg width="30" height="36" viewBox="0 0 30 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M-8.74228e-07 18L30 0.679488L30 35.3205L-8.74228e-07 18Z" fill="var(--primary-color)"/>
            </svg>
          </div>
          <div className="next-btn" onClick={() => {
            changeModalImage('next')
          }}>
            <svg width="30" height="36" viewBox="0 0 30 36" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M30 18L4.45043e-07 35.3205L3.19526e-08 0.679491L30 18Z" fill="var(--primary-color)"/>
            </svg>
          </div>

        </div>
       
        <motion.div 
          className="modal-images-wrapper"
          animate={control}
          initial={{
            x: `-${modal.index * 100}%`
          }}
        >
            {modal.data}
        </motion.div>
      </motion.div>
      }

   </AnimatePresence>

      <div className="movie-wrapper">
        <div className="left-col">
          <div className="movie-poster-container">
            <img
              src={poster}
              alt=""
            />
          </div>
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
