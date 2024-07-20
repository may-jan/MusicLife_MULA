import React, { useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { BiSolidUser } from 'react-icons/bi';
import { RiPlayListFill } from 'react-icons/ri';
import { IoIosHeart } from 'react-icons/io';
import '../styles/Mypage.css';
import axios from 'axios';

const Mypage = () => {
  const navigate = useNavigate();
  const onCancel = () => {
    navigate(-1);
  };

  const token = sessionStorage.getItem('token');
  const [userName, setUserName] = useState('');
  const [userImg, setUserImg] = useState('');

  // 사용자 프로필 가져오기
  const getUserInfo = async () => {
    await axios
      .get(`https://api.spotify.com/v1/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = res.data;
        setUserName(data.display_name);
        setUserImg(data.images[1].url);
      })
      .catch((e) => {
        console.log('Mypage getUserInfo 오류');
      });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className='Mypage'>
      <div className='Mypage_userWrap'>
        <div className='Mypage_userImg'>
          {userImg ? (
            <img src={userImg} alt='userImg' />
          ) : (
            <BiSolidUser className='icon_userImg' />
          )}
        </div>
        <div className='Mypage_userName'>{userName}</div>
      </div>
      <div className='Mypage_listWrap'>
        <Link to='/playlists'>
          <div className='Mypage_list'>
            <RiPlayListFill className='Mypage_listIcon' />
            <div className='Mypage_listTitle'>플레이리스트</div>
          </div>
        </Link>
        <Link to='/likelists'>
          <div className='Mypage_list'>
            <IoIosHeart className='Mypage_listIcon' />
            <div className='Mypage_listTitle'>찜한 목록</div>
          </div>
        </Link>
      </div>

      <IoIosArrowBack className='backBtn' onClick={onCancel} />
    </div>
  );
};

export default Mypage;
