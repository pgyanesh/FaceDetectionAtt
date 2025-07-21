import './secondHome.css';
import logo1 from '../src/assets/admin.jpg';
import logo2 from '../src/assets/student.jpg';
import { useNavigate } from 'react-router-dom';

function SecondHome() {
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate('/admin/login');
  };

  const handleStudentClick = () => {
    navigate('/student');
  };

  return (
    <div className='mainDiv'>
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
