import { useState } from "react";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { useNavigate } from "react-router-dom";

import SearchIcon from "./icons/SearchIcon";

const SearchBox: React.FC = () => {
  const { mediaType, lang, baseName } = useGlobalContext();

  const text =
    lang === "en"
      ? ["Find", "movie...", "tv show..."]
      : ["Найти", "фильм...", "сериал..."];

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const search = () => {
    if (searchTerm) {
      navigate(`${baseName}search/${searchTerm}`);
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
          <SearchIcon />
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
