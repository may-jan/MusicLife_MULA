import React, { useEffect, useState } from 'react';
import '../styles/Login.css';
import { BiSolidUser } from 'react-icons/bi';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { RiUserSettingsLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Login = () => {
  const CLIENT_ID = 'f4b4bacfdfbf44f89d8fa4a067ded1ba';
  const REDIRECT_URI = 'https://musiclife-mula.netlify.app';
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const RESPONSE_TYPE = 'token';
  const SCOPES = [
    'playlist-modify-public',
    'playlist-modify-private',
    'user-library-read',
    'user-library-modify',
  ];

  const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${encodeURIComponent(
    SCOPES.join(' ')
  )}`;

  const [token, setToken] = useState('');
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.sessionStorage.getItem('token');

    if (!token && hash) {
      token = hash
        .substring(1)
        .split('&')
        .find((elem) => elem.startsWith('access_token'))
        .split('=')[1];

      window.location.hash = ''; //hash 초기화
      window.sessionStorage.setItem('token', token); //sessionStorage에 token 저장
      window.location.reload();
    }
    setToken(token);
  }, []);

  const login = () => {
    window.location.href = authUrl;
  };

  const logout = () => {
    setToken('');
    window.sessionStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div className='Login'>
      <div>
        {!token ? (
          <button className='btn_login' onClick={login}>
            <BiSolidUser className='icon_login' />
          </button>
        ) : (
          <div className='loginHeader'>
            <Link to='/mypage' className='btn_mypage'>
              <RiUserSettingsLine className='icon_mypage' />
            </Link>
            <button className='btn_logout' onClick={logout}>
              <RiLogoutCircleRLine className='icon_logout' />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
