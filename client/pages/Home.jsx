import './Home.css';
import logo from '../src/assets/finalLogo.png';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate(); // Step 1

  const handleLogoClick = () => {
    navigate('/home2'); // Step 2
  };

  return (
    <div className='homePagediv1' style={{ backgroundColor: 'transparent' }}>
      <img
        className='homeImg'
        src={logo}
        alt="Logo"
        onClick={handleLogoClick}
        style={{ cursor: 'pointer' }} // Optional: makes it look clickable
      />
    </div>
  );
}

export default Home;
