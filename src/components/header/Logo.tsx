import { Link } from 'react-router-dom';

import getBaseURL from '../../utils/getBaseURL';

const Logo: React.FC = () => {
  return (
    <div className="logo-container">
      <Link to={getBaseURL()}>
        <img src={getBaseURL('assets/images/logo.svg')} alt="FilmsBase" />
        <h3>
          FILMS<span className="logo-accent">BASE</span>
        </h3>
      </Link>
    </div>
  );
};

export default Logo;
