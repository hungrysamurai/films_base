const ListsContainer = ({ currentList, setList }) => {
  return (
    <div className="lists-container">
      <ul>
        <li
          onClick={(e) => setList(e.target.dataset.list)}
          data-list="upcoming"
          className={currentList === "upcoming" ? "active" : ""}
        >
          Скоро
        </li>
        <li
          onClick={(e) => setList(e.target.dataset.list)}
          data-list="now_playing"
          className={currentList === "now_playing" ? "active" : ""}
        >
          Сейчас в кинотеатрах
        </li>
        <li
          onClick={(e) => setList(e.target.dataset.list)}
          data-list="popular"
          className={currentList === "popular" ? "active" : ""}
        >
          Популярные
        </li>
        <li
          onClick={(e) => setList(e.target.dataset.list)}
          data-list="top_rated"
          className={currentList === "top_rated" ? "active" : ""}
        >
          По рейтингу
        </li>
        <li
          onClick={(e) => setList(e.target.dataset.list)}
          data-list="genres"
          className={currentList === "genres" ? "active" : ""}
        >
          Жанры
        </li>
      </ul>
    </div>
  );
};

export default ListsContainer;
