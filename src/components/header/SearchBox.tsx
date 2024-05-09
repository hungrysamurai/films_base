import { useState } from "react";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { useNavigate } from "react-router-dom";

import SearchIcon from "./icons/SearchIcon";
import { Lang } from "../../types";
import getBaseURL from "../../utils/getBaseURL";
import { useAppSelector } from "../../store/hooks";
import { getCurrentLang } from "../../store/slices/mainSlice";

const SearchBox: React.FC = () => {
  const { mediaType } = useGlobalContext();

  const lang = useAppSelector(getCurrentLang);

  const text =
    lang === Lang.En
      ? ["Find", "movie...", "tv show..."]
      : ["Найти", "фильм...", "сериал..."];

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const search = () => {
    if (searchTerm) {
      navigate(getBaseURL(`search/${searchTerm}`));
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
