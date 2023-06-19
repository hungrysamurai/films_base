import { useState } from "react";
import GenresList from "../components/home/GenresList";
import ListsContainer from "../components/home/ListsContainer";

const Home = () => {
  const [currentList, setCurrentList] = useState("genres");

  const setList = (list) => {
    setCurrentList(list);
  };
  return (
    <section className="section-home">
      <ListsContainer currentList={currentList} setList={setList} />
      {currentList === "genres" ? <GenresList /> : null}
    </section>
  );
};

export default Home;
