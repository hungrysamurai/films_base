import { useGlobalContext } from "../../contexts/GlobalContext";

const MediaTypeLinks = () => {

 const {mediaType,dispatch} = useGlobalContext();

 return (
        <div className="media-type-links">

        <a href="#" 
        className={mediaType === 'movie' ? 'active' : ''} 
        onClick={() => {
         dispatch({type: 'SET_MEDIA_TYPE', payload: 'movie'})
        }}>
          Фильмы
        </a>
        <a href="#" 
        className={mediaType === 'tv' ? 'active':''} onClick={() => {
         dispatch({type: 'SET_MEDIA_TYPE', payload: 'tv'})
        }}>
         Сериалы
         </a>

      </div>
 )
}

export default MediaTypeLinks;