import { useGlobalContext } from "../../contexts/GlobalContext";

const SearchBox = () => {
  const { baseName, theme, mediaType, lang } = useGlobalContext();

  const text = lang === 'en' ?
  ['Find', 'movie...', 'tv show...'] :
  ['Найти', 'фильм...', 'сериал...']

  return (
    <div className="search-box-container">
      <form className="search-box-form">
        <button className="search-button">
          <img
            src={`${baseName}assets/images/icons/icon-search-${theme}.svg`}
            alt=""
          />
        </button>
        <input
          type="text"
          className="search-box-input"
          placeholder={`${text[0]} ${
            mediaType === "movie" ? text[1] : text[2]
          }`}
        />
      </form>
    </div>
  );
};

export default SearchBox;
