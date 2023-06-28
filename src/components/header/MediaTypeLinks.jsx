import { useGlobalContext } from "../../contexts/GlobalContext";

const MediaTypeLinks = () => {

 const {mediaType,dispatch} = useGlobalContext();

 return (
        <div className="media-type-links">

        <button href="#" 
        className={mediaType === 'movie' ? 'active' : ''} 
        onClick={() => {
         dispatch({type: 'SET_MEDIA_TYPE', payload: 'movie'})
        }}>
          Фильмы
        </button>
        <button href="#" 
        className={mediaType === 'tv' ? 'active':''} onClick={() => {
         dispatch({type: 'SET_MEDIA_TYPE', payload: 'tv'})
        }}>
         Сериалы
         </button>

      </div>
 )
}

export default MediaTypeLinks;