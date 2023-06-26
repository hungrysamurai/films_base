import { Link } from "react-router-dom";
import { useGlobalContext } from "../../contexts/GlobalContext";

const Logo = () => {
  const { baseName } = useGlobalContext();

  return (
    <div className="logo-container">
      <Link to={baseName}>
        <img src={`${baseName}assets/images/logo.svg`} alt="FilmsBase" />
        <h3>
          FILMS<span className="logo-accent">BASE</span>
        </h3>
      </Link>
    </div>
  );
};

export default Logo;
