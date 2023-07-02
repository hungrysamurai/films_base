import { useState } from "react";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const { baseName, theme, mediaType, lang } = useGlobalContext();

  const text =
    lang === "en"
      ? ["Find", "movie...", "tv show..."]
      : ["Найти", "фильм...", "сериал..."];

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const search = () => {
    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
      setSearchTerm("");
    }
  };

  return (
    <div className="search-box-container">
      <form
        className="search-box-form"
        onSubmit={(e) => {
          e.preventDefault();
          search();
        }}
      >
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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
    </div>
  );
};

export default SearchBox;
