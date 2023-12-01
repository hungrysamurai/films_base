type ButtonProps = {
  type: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: () => unknown;
  imgPath?: string;
  text?: string;
};

const Button: React.FC<ButtonProps> = ({ type, onClick, imgPath, text }) => {
  return (
    <button type={type} onClick={() => (onClick ? onClick() : null)}>
      <span>
        {text ? text : null}
        {imgPath && <img src={imgPath} />}
      </span>
    </button>
  );
};

export default Button;
