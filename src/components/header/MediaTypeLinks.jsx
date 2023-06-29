import { useGlobalContext } from "../../contexts/GlobalContext";

const MediaTypeLinks = () => {

 const {lang,mediaType,dispatch} = useGlobalContext();

 return (
        <div className="media-type-links">

        <button 
        className={mediaType === 'movie' ? 'active' : ''} 
        onClick={() => {
         dispatch({type: 'SET_MEDIA_TYPE', payload: 'movie'})
        }}>
          {lang === 'en' ? 'Movies' : 'Фильмы'}
        </button>
        <button
        className={mediaType === 'tv' ? 'active':''} onClick={() => {
         dispatch({type: 'SET_MEDIA_TYPE', payload: 'tv'})
        }}>
         {lang === 'en' ? 'TV Shows' : 'Сериалы'}
         </button>

      </div>
 )
}

export default MediaTypeLinks;