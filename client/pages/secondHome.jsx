import './secondHome.css';
import logo1 from '../src/assets/789.png';
import logo2 from '../src/assets/234.png';
import logo from "../src/assets/nie.png";

import { useNavigate } from 'react-router-dom';

function SecondHome() {
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate('/admin/login');
  };

  const handleStudentClick = () => {
    navigate('/student');
  };

  const goHome = () => {
    navigate("/")
  };

  return (
    <div className='mainDiv'>
      <div className="homeFig">
            <header className="homeHeader">
                    <img src={logo} alt="Logo" className="logo"  onClick={goHome}/>
            </header>
            </div>
      <div className="centerDiv">
        <img
          className='logos'
          src={logo1}
          alt='Admin'
          onClick={handleAdminClick}
          style={{ cursor: 'pointer' }}
        />
        <img
          className='logos'
          src={logo2}
          alt='Student'
          onClick={handleStudentClick}
          style={{ cursor: 'pointer' }}
        />
      </div>
    </div>
  );
}

export default SecondHome;
