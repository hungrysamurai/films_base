import { movieLists, tvLists } from '../../data/lists';
import { MovieFilterListTerm, TVFilterListTerm } from '../../types';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getCurrentLang } from '../../store/slices/mainSlice';
import {
  getHomePageFilterList,
  getHomePageMediaType,
  setHomePageFilterList,
} from '../../store/slices/homePageParamsSlice';

const ListsContainer: React.FC = () => {
  const dispatch = useAppDispatch();

  const lang = useAppSelector(getCurrentLang);
  const mediaType = useAppSelector(getHomePageMediaType);
  const filterList = useAppSelector(getHomePageFilterList);

  const list = mediaType === 'movie' ? movieLists[lang] : tvLists[lang];

  return (
    <div className="lists-container">
      <ul>
        {list.map((item, i) => {
          const dataValue = Object.keys(item)[0] as
            | MovieFilterListTerm
            | TVFilterListTerm;

          const title: string = Object.values(item)[0];

          return (
            <li
              key={i}
              onClick={() => {
                dispatch(setHomePageFilterList(dataValue));
              }}
              className={filterList === dataValue ? 'active' : ''}
            >
              {title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ListsContainer;
