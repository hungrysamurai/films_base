import CustomMoviesList from "../components/moviesList/CustomMoviesList"

const TestPage = () => {
 return (
  <CustomMoviesList data={[
            { id: 238, mediaType: 'movie' },
            { id: 129, mediaType: 'movie' },
            { id: 155, mediaType: 'movie' },
            { id: 94605, mediaType: 'tv' },
            { id: 772071, mediaType: 'movie' },
            { id: 39102, mediaType: 'movie' }
          ]} 
          listMode='userList'/>
 )
}

export default TestPage