const SingleMovie = ({title, poster}) => {
 return (
  <div className="movie-container">

    <div className="movie-poster-container">
    <img src={poster} alt="" />
    </div>

    <div className="movie-title-container">
     <h3>{title}</h3>
    </div>

  </div>
 )
}

export default SingleMovie;