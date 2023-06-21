import { movieLists, tvLists } from "../data/Lists";
import GenresList from "../components/home/GenresList";
import ListsContainer from "../components/home/ListsContainer";
import MoviesList from "../components/moviesList/MoviesList";
import { useGlobalContext } from "../contexts/GlobalContext";
import { Link } from "react-router-dom";


const Home = () => {
  const { filterList,setFilterList, mediaType, lang, baseName} = useGlobalContext();

  const list = mediaType === 'movie' ? movieLists : tvLists;

  const setList = (list) => {
    setFilterList(list);
  };

  return (
    <section className="section-home">
      <ListsContainer currentList={filterList} setList={setList} list={list[lang]}/>
     <GenresList  /> 
     <MoviesList/>
     {/* <Link to={`${baseName}test`}>test</Link> */}
    
    </section>
  );
};

export default Home;
