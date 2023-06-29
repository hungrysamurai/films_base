const YoutubeEmbed = ({videoKey}) => {

 return(
   <div className="movie-video-container">
      <iframe 
      src={`https://www.youtube.com/embed/${videoKey}`} title="YouTube video player" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      onLoad={() => console.log('video loaded')}
      allowFullScreen>
      </iframe>
    </div>
 )
}

export default YoutubeEmbed