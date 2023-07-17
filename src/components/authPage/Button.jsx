const Button = ({ type, onClick, imgPath, text}) => {
 return (
  <button 
  type={type} 
  onClick={() => (onClick ? onClick() : null)}>
   <span>
    {text ? text : null}
    {imgPath && 
    <img src={imgPath} />
    }
   </span>
  </button>
 )
}

export default Button