
import GenresList from "../components/home/GenresList";
import ListsContainer from "../components/home/ListsContainer";
import MoviesList from "../components/moviesList/MoviesList";
import { useGlobalContext } from "../contexts/GlobalContext";
import { Link } from "react-router-dom";


const Home = () => {
  const { baseName} = useGlobalContext();

  return (
    <section className="section-home">
      <ListsContainer/>
     <GenresList  /> 
     <MoviesList/>
     <Link to={`${baseName}test`}>test</Link>
    
    </section>
  );
};

export default Home;
