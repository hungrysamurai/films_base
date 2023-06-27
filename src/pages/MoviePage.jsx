import { useParams } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useEffect, useState } from "react";

import { motion, useAnimation, AnimatePresence } from 'framer-motion';

import ImageGallery from "../components/moviePage/ImageGallery";

const MoviePage = () => {
  const { setCurrentTitle } = useGlobalContext();
  const { id } = useParams();

  const [modal, setModal] = useState({
    show: false,
    data: [],
    index: 0
  });

  const control = useAnimation();

  useEffect(() => {
    setCurrentTitle("Властелин Колец: Возвращение Короля");
  }, [id, setCurrentTitle]);

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
    console.log(target.classList);
    if (target.classList.contains('modal-index-controls')){
      setModal((prev) => {
        return {
          ...prev,
          show: false
        }
      })
    }
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

            let prevIndex = 
            modal.index === 0 
            ? modal.data.length - 1 
            : modal.index - 1

            setModal((prev) => {
              return {
                ...prev,
                index: prevIndex
              }
            })
          }}>

            <svg width="30" height="36" viewBox="0 0 30 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M-8.74228e-07 18L30 0.679488L30 35.3205L-8.74228e-07 18Z" fill="var(--primary-color)"/>
            </svg>
          </div>
          <div className="next-btn" onClick={() => {
      
            let nextIndex = 
            modal.index === modal.data.length - 1 
            ? 0 
            : modal.index + 1;

            setModal((prev) => {
              return {
                ...prev,
                index: nextIndex 
              }
            })
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
              src="https://image.tmdb.org/t/p/original/xGeAWst9lwoJj7ldCWerBjAyUNk.jpg"
              alt=""
            />
          </div>
        </div>
        <div className="right-col">
          <div className="data-container">
            <div className="data-item">
              <span className="label">Дата выхода </span>
              <span className="data-info">12 января 2003 года</span>
            </div>
            <div className="data-item">
              <span className="label">Жанр</span>
              <span className="data-info">Приключения, фэнтези, боевик</span>
            </div>
            <div className="data-item">
              <span className="label">Страна</span>
              <span className="data-info">Новая Зеландия, США</span>
            </div>
            <div className="data-item">
              <span className="label">Бюджет</span>
              <span className="data-info">$94 000 000 </span>
            </div>
            <div className="data-item">
              <span className="label">Сборы</span>
              <span className="data-info">$1 118 888 979</span>
            </div>
            <div className="data-item">
              <span className="label">Продолжительность</span>
              <span className="data-info">3 часа 21 минута</span>
            </div>
          </div>
          <div className="description-container">
            <p>
              Последняя часть трилогии о Кольце Всевластия и о героях, взявших
              на себя бремя спасения Средиземья. Повелитель сил Тьмы Саурон
              направляет свои бесчисленные рати под стены Минас-Тирита, крепости
              Последней Надежды. Он предвкушает близкую победу, но именно это и
              мешает ему заметить две крохотные фигурки — хоббитов,
              приближающихся к Роковой Горе, где им предстоит уничтожить Кольцо
              Всевластия. Улыбнется ли им счастье?
            </p>
          </div>

          <ImageGallery openModal={openModal} />
        </div>
      </div>
    </section>
  );
};

export default MoviePage;
