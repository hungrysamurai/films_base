import { useParams, useLocation } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useUserContext } from "../contexts/UserContext";
import { useEffect, useState, Suspense } from "react";
import { useAnimation, AnimatePresence } from "framer-motion";
import { useFetchSingleMovie } from "../hooks/useFetchSingleMovie";

import ImageGallery from "../components/moviePage/ImageGallery";
import Loader from "../components/Loader";
import MoviePoster from "../components/moviePage/MoviePoster";
import YoutubeEmbed from "../components/moviePage/Youtubeembed";
import ErrorMessage from "../components/ErrorMessage";
import Modal from "../components/modal/Modal";
import ImagesGalleryModal from "../components/modal/ImagesGalleryModal";
import UserListsWidget from "../components/moviePage/UserListswidget/UserListsWidget";
import SimilarMoviesList from "../components/moviesList/SimilarMoviesList";

const MoviePage = () => {
  const { setCurrentTitle, lang } = useGlobalContext();
  const { currentUser } = useUserContext();

  const { id } = useParams();
  const location = useLocation();

  const currentMediaType = location.pathname.split("/")[3];

  const [imagesGalleryModalState, setImagesGalleryModalState] = useState({
    show: false,
    imagesArray: [],
    imageIndex: 0,
  });

  const control = useAnimation();

  const {
    data,
    images,
    videos,
    dataError,
    imagesError,
    videosError,
    isLoading,
  } = useFetchSingleMovie(currentMediaType, lang, id);

  const { data: mediaData, description, title, poster } = data || {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (isLoading) {
      setCurrentTitle(() => "");
    } else if (dataError.show) {
      setCurrentTitle(dataError.message);
    } else {
      setCurrentTitle(title);
    }
  }, [title, setCurrentTitle, isLoading, lang, dataError]);

  useEffect(() => {
    control.start({
      x: `-${imagesGalleryModalState.imageIndex * 100}%`,
    });
  }, [imagesGalleryModalState.imageIndex, control]);

  const openModal = (data, imageIndex) => {
    setImagesGalleryModalState(() => {
      const images = data.map((item, i) => {
        return (
          <div className="modal-image-container" key={i}>
            <img src={item} alt="gallery-image" />
          </div>
        );
      });
      return { show: true, imagesArray: images, imageIndex };
    });
  };

  const hideModal = (target) => {
    if (target.classList.contains("modal-index-controls")) {
      setImagesGalleryModalState((prev) => {
        return {
          ...prev,
          show: false,
        };
      });
    }
  };

  const changeModalImage = (direction) => {
    let nextIndex;

    if (direction === "next") {
      nextIndex =
        imagesGalleryModalState.imageIndex ===
        imagesGalleryModalState.imagesArray.length - 1
          ? 0
          : imagesGalleryModalState.imageIndex + 1;
    } else {
      nextIndex =
        imagesGalleryModalState.imageIndex === 0
          ? imagesGalleryModalState.imagesArray.length - 1
          : imagesGalleryModalState.imageIndex - 1;
    }

    setImagesGalleryModalState((prev) => {
      return {
        ...prev,
        imageIndex: nextIndex,
      };
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="section-single-movie">
      <AnimatePresence>
        {imagesGalleryModalState.show && (
          <Modal mode="gallery">
            <ImagesGalleryModal
              hideModal={hideModal}
              changeModalImage={changeModalImage}
              control={control}
              modal={imagesGalleryModalState}
            />
          </Modal>
        )}
      </AnimatePresence>

      <div className="movie-wrapper">
        <div className="left-col">
          {dataError.show ? (
            <ErrorMessage
              errorMessage={dataError.message}
              componentMessage="Ошибка при загрузке данных"
              showImage={true}
            />
          ) : (
            <MoviePoster image={poster} />
          )}

          {videosError.show ? (
            <ErrorMessage
              errorMessage={videosError.message}
              componentMessage="Ошибка при загрузке видео"
              showImage={true}
            />
          ) : (
            videos.map((videoKey, i) => {
              return <YoutubeEmbed key={i} videoKey={videoKey} />;
            })
          )}
        </div>

        <div className="right-col">
          {currentUser && (
            <UserListsWidget
              id={id}
              mediaType={currentMediaType}
              title={title}
            />
          )}

          <div className="data-container">
            {dataError.show ? (
              <ErrorMessage
                errorMessage={dataError.message}
                componentMessage="Ошибка при загрузке данных"
                showImage={false}
              />
            ) : (
              mediaData.map((dataItem, i) => {
                const [label, info] = Object.entries(dataItem)[0];

                return (
                  <div className="data-item" key={i}>
                    <span className="label">{label}</span>
                    <span className="data-info">{info}</span>
                  </div>
                );
              })
            )}
          </div>
          <div className="description-container">
            <p>{description}</p>
          </div>
          {imagesError.show ? (
            <ErrorMessage
              errorMessage={videosError.message}
              componentMessage="Ошибка при загрузке галереи"
              showImage={true}
            />
          ) : (
            <ImageGallery openModal={openModal} imagesArray={images} />
          )}
        </div>
      </div>

      <Suspense fallback={<Loader />}>
        <SimilarMoviesList itemID={id} itemMediaType={currentMediaType} />
      </Suspense>
    </section>
  );
};

export default MoviePage;
