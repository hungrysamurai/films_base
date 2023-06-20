import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="logo-container">
      <Link to='/'>
      <img src="./assets/images/logo.svg" alt="FilmsBase" />
      <h3>
        FILMS<span className="logo-accent">BASE</span>
      </h3>
      </Link>
    </div>
  );
};

export default Logo;
