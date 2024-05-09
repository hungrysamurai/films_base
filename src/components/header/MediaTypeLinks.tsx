import { useGlobalContext } from "../../contexts/GlobalContext";
import { MoviesListReducerActionTypes } from "../../reducers/moviesListReducer";
import { useAppSelector } from "../../store/hooks";
import { getCurrentLang } from "../../store/slices/mainSlice";
import { Lang, MediaType } from "../../types";

const MediaTypeLinks: React.FC = () => {
  const { mediaType, dispatch } = useGlobalContext();

  const lang = useAppSelector(getCurrentLang);

  return (
    <div className="media-type-links">
      <button
        className={mediaType === MediaType.Movie ? "active" : ""}
        onClick={() => {
          dispatch({
            type: MoviesListReducerActionTypes.SET_MEDIA_TYPE,
            payload: MediaType.Movie,
          });
        }}
      >
        {lang === Lang.En ? "Movies" : "Фильмы"}
      </button>

      <button
        className={mediaType === MediaType.TV ? "active" : ""}
        onClick={() => {
          dispatch({
            type: MoviesListReducerActionTypes.SET_MEDIA_TYPE,
            payload: MediaType.TV,
          });
        }}
      >
        {lang === Lang.En ? "TV Shows" : "Сериалы"}
      </button>
    </div>
  );
};

export default MediaTypeLinks;
