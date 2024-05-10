import { useGlobalContext } from "../../contexts/GlobalContext";
import { MoviesListReducerActionTypes } from "../../reducers/moviesListReducer";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getHomePageMediaType,
  setHomePageMediaType,
} from "../../store/slices/homePageParamsSlice";
import { getCurrentLang } from "../../store/slices/mainSlice";
import { Lang, MediaType } from "../../types";

const MediaTypeLinks: React.FC = () => {
  const { mediaType, dispatch: cDispatch } = useGlobalContext();

  const dispatch = useAppDispatch();
  const homePageMediaType = useAppSelector(getHomePageMediaType);

  const lang = useAppSelector(getCurrentLang);

  return (
    <div className="media-type-links">
      <button
        className={mediaType === MediaType.Movie ? "active" : ""}
        onClick={() => {
          dispatch(setHomePageMediaType(MediaType.Movie));
          cDispatch({
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
          dispatch(setHomePageMediaType(MediaType.TV));
          cDispatch({
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
