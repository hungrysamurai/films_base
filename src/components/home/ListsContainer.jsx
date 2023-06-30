import { movieLists, tvLists } from "../../data/lists";

import { useGlobalContext } from "../../contexts/GlobalContext";

const ListsContainer = () => {

  const { mediaType, filterList, lang, dispatch } =  useGlobalContext();

  const list = mediaType === 'movie' ? movieLists[lang] : tvLists[lang];

  return (
    <div className="lists-container">
      <ul>
        {list.map((item,i) => {

          const dataValue = Object.keys(item)[0];
          const title = Object.values(item)[0];
      
          return (
            <li key={i}
              onClick={() => dispatch({type: 'SET_FILTER_LIST', payload: dataValue})}
              className={filterList === dataValue ? "active" : ""}
        >
          {title}
        </li>
          )
        })}

      </ul>
    </div>
  );
};

export default ListsContainer;
