import PropTypes from 'prop-types';

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

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  imgPath: PropTypes.string,
  text: PropTypes.string
}

export default Button