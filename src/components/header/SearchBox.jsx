import { useGlobalContext } from "../../contexts/GlobalContext";

const SearchBox = () => {

const {theme,mediaType} = useGlobalContext();

 return (      
 <div className="search-box-container">
    

        <form className="search-box-form">
             <button className="search-button">
          <img src={`./assets/images/icons/icon-search-${theme}.svg`} alt="" />
        </button>
          <input
            type="text"
            className="search-box-input"
            placeholder={`Найти ${mediaType === 'movie' ? 'фильм...' : 'сериал...'}`}
          />
        </form>
  </div>
      )
}

export default SearchBox;