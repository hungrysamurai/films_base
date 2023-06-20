import { useGlobalContext } from "../../contexts/GlobalContext";

const MediaTypeLinks = () => {

 const {mediaType,setMediaType} = useGlobalContext();

 return (
        <div className="media-type-links">

        <a href="#" 
        className={mediaType === 'movie' ? 'active' : ''} 
        onClick={() => {
         setMediaType('movie')
        }}>
          Фильмы
        </a>
        <a href="#" 
        className={mediaType === 'tv' ? 'active':''} onClick={() => {
         setMediaType('tv')
        }}>
         Сериалы
         </a>

      </div>
 )
}

export default MediaTypeLinks;