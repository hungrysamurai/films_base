import { useGlobalContext } from "../../contexts/GlobalContext";

const SearchBox = () => {

const {theme} = useGlobalContext();

 return (      
 <div className="search-box-container">
        <button className="search-button">
          <img src={`./assets/images/icons/icon-search-${theme}.svg`} alt="" />
        </button>

        <form className="search-box-form">
          <input
            type="text"
            className="search-box-input"
            placeholder="Найти фильм..."
          />
        </form>
  </div>
      )
}

export default SearchBox;