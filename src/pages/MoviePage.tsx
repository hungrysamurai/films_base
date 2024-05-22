import { Lang, MediaType, ModalMode } from '../types';

import { ReactElement } from 'react';

import { useParams, useLocation } from 'react-router-dom';

import { useEffect, useState, Suspense } from 'react';
import { useAnimation, AnimatePresence } from 'framer-motion';

import ImageGallery from '../components/moviePage/ImageGallery';
import Loader from '../components/Loader';
import MoviePoster from '../components/moviePage/MoviePoster';
import YoutubeEmbed from '../components/moviePage/Youtubeembed';
import ErrorMessage from '../components/ErrorMessage';
import Modal from '../components/modal/Modal';
import ImagesGalleryModal from '../components/modal/ImagesGalleryModal';
import UserListsWidget from '../components/moviePage/UserListsWidget/UserListsWidget';
import SimilarMoviesList from '../components/moviesList/SimilarMoviesList';
import getBaseURL from '../utils/getBaseURL';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getCurrentUser } from '../store/slices/authSlice';
import { getCurrentLang, setMainTitle } from '../store/slices/mainSlice';
import useGetSingleMovie from '../hooks/useGetSingleMovie';

export enum ModalDirection {
  Next = 'next',
  Prev = 'prev',
}

export type ImagesGalleryModalState = {
  show: boolean;
  imagesArray: ReactElement[];
  imageIndex: number;
};

const MoviePage: React.FC = () => {
  const dispatch = useAppDispatch();

  const lang = useAppSelector(getCurrentLang);
  const currentUser = useAppSelector(getCurrentUser);

  const { id } = useParams();
  const location = useLocation();

  // Set media type of item based on provided URL
  const currentMediaType = location.pathname
    .substring(getBaseURL().length)
    .split('/')[0] as MediaType;

  const [imagesGalleryModalState, setImagesGalleryModalState] =
    useState<ImagesGalleryModalState>({
      show: false,
      imagesArray: [],
      imageIndex: 0,
    });

  const control = useAnimation();

  const {
    data,
    images,
    videos,
    isLoading,
    isDataError,
    isImagesError,
    isVideosError,
  } = useGetSingleMovie({
    mediaType: currentMediaType,
    lang,
    id: id as string,
  });

  const {
    data: mediaData = [],
    description,
    title,
    poster,
  } = (data as SingleItemDataProps) || {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (isLoading) {
      dispatch(setMainTitle(''));
    } else if (isDataError) {
      dispatch(
        setMainTitle(
          lang === Lang.En ? 'Request failed!' : 'Ошибка загрузки данных!',
        ),
      );
    } else {
      dispatch(setMainTitle(title as string));
    }
  }, [title, isLoading, lang, isDataError]);

  useEffect(() => {
    control.start({
      x: `-${imagesGalleryModalState.imageIndex * 100}%`,
    });
  }, [imagesGalleryModalState.imageIndex, control]);

  const openModal = (data: string[], imageIndex: number) => {
    setImagesGalleryModalState(() => {
      const images = data.map((item: string, i: number) => {
        return (
          <div className="modal-image-container" key={i}>
            <img src={item} alt="gallery-image" />
          </div>
        );
      });

      return { show: true, imagesArray: images, imageIndex };
    });
  };

  const hideModal = (target: HTMLDivElement) => {
    if (target.classList.contains('modal-index-controls')) {
      setImagesGalleryModalState((prev) => {
        return {
          ...prev,
          show: false,
        };
      });
    }
  };

  const changeModalImage = (direction: ModalDirection) => {
    let nextIndex: number;

    if (direction === ModalDirection.Next) {
      nextIndex =
        imagesGalleryModalState.imageIndex ===
        imagesGalleryModalState.imagesArray.length - 1
          ? 0
          : imagesGalleryModalState.imageIndex + 1;
    } else if (direction === ModalDirection.Prev) {
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
          <Modal mode={ModalMode.Gallery}>
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
          {isDataError ? (
            <ErrorMessage
              errorMessage={'Request Failed!'}
              componentMessage="Ошибка при загрузке данных"
              showImage={true}
            />
          ) : (
            <MoviePoster image={poster} />
          )}

          {isVideosError ? (
            <ErrorMessage
              errorMessage={'Request Failed!'}
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
              id={id as string}
              mediaType={currentMediaType}
              title={title as string}
            />
          )}

          <div className="data-container">
            {isDataError ? (
              <ErrorMessage
                errorMessage={'Request Failed!'}
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
          {isImagesError ? (
            <ErrorMessage
              errorMessage={'Request Failed!'}
              componentMessage="Ошибка при загрузке галереи"
              showImage={true}
            />
          ) : (
            <ImageGallery openModal={openModal} imagesArray={images} />
          )}
        </div>
      </div>

      <Suspense fallback={<Loader />}>
        <SimilarMoviesList
          itemID={id as string}
          itemMediaType={currentMediaType}
        />
      </Suspense>
    </section>
  );
};

export default MoviePage;
