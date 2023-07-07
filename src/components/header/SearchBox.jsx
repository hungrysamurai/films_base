import { useState } from "react";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const { baseName, mediaType, lang } = useGlobalContext();

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
          {/* <img
            src={`${baseName}assets/images/icons/icon-search-${theme}.svg`}
            alt=""
          /> */}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M9 2C5.13401 2 2 5.13401 2 9C2 12.866 5.13401 16 9 16C12.866 16 16 12.866 16 9C16 5.13401 12.866 2 9 2ZM0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9Z" fill="var(--primary-color)"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M13.9428 13.9428C14.3333 13.5523 14.9665 13.5523 15.357 13.9428L19.707 18.2928C20.0975 18.6833 20.0975 19.3165 19.707 19.707C19.3165 20.0975 18.6833 20.0975 18.2928 19.707L13.9428 15.357C13.5523 14.9665 13.5523 14.3333 13.9428 13.9428Z" fill="var(--primary-color)"/>
          </svg>


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
