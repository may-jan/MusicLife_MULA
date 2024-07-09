import React from 'react';
import Login from '../hooks/Login';
import '../styles/Header.css';

const Header = () => {
  const goHome = () => {
    window.location.reload();
  };

  return (
    <div className='Header'>
      <div className='logoImg' onClick={goHome}>
        <img src={process.env.PUBLIC_URL + 'logo192.png'} alt='logoImg' />
      </div>
      <Login />
    </div>
  );
};

export default Header;
