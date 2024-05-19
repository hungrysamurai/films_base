import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  getHomePageMediaType,
  setHomePageMediaType,
} from '../../store/slices/homePageParamsSlice';
import { getCurrentLang } from '../../store/slices/mainSlice';
import { Lang, MediaType } from '../../types';

const MediaTypeLinks: React.FC = () => {
  const dispatch = useAppDispatch();
  const mediaType = useAppSelector(getHomePageMediaType);

  const lang = useAppSelector(getCurrentLang);

  return (
    <div className="media-type-links">
      <button
        className={mediaType === MediaType.Movie ? 'active' : ''}
        onClick={() => {
          dispatch(setHomePageMediaType(MediaType.Movie));
        }}
      >
        {lang === Lang.En ? 'Movies' : 'Фильмы'}
      </button>

      <button
        className={mediaType === MediaType.TV ? 'active' : ''}
        onClick={() => {
          dispatch(setHomePageMediaType(MediaType.TV));
        }}
      >
        {lang === Lang.En ? 'TV Shows' : 'Сериалы'}
      </button>
    </div>
  );
};

export default MediaTypeLinks;
