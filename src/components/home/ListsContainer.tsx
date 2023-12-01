import { movieLists, tvLists } from "../../data/Lists";
import { MovieFilterListTerm, TVFilterListTerm } from "../../types";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { MoviesListReducerActionTypes } from "../../reducers/moviesListReducer";

const ListsContainer = () => {
  const { mediaType, filterList, lang, dispatch } = useGlobalContext();

  const list = mediaType === "movie" ? movieLists[lang] : tvLists[lang];

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
              onClick={() =>
                dispatch({
                  type: MoviesListReducerActionTypes.SET_FILTER_LIST,
                  payload: dataValue,
                })
              }
              className={filterList === dataValue ? "active" : ""}
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
