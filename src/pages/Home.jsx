import { useState } from "react";
import GenresList from "../components/home/GenresList";
import ListsContainer from "../components/home/ListsContainer";
import { useGlobalContext } from "../contexts/GlobalContext";

const Home = () => {
  const [currentList, setCurrentList] = useState("top_rated");

  const {movieLists, tvLists, mediaType,lang} = useGlobalContext();

  const list = mediaType === 'movie' ? movieLists : tvLists;

  const setList = (list) => {
    setCurrentList(list);
  };

  return (
    <section className="section-home">

      <ListsContainer currentList={currentList} setList={setList} list={list[lang]}/>

      {currentList === "genres" ? 
      <GenresList  /> : 
      <div className="genres-list-container"></div>
      }

      

    </section>
  );
};

export default Home;
