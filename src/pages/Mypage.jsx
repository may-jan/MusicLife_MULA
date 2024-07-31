import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { BiSolidUser } from 'react-icons/bi';
import { RiPlayListFill } from 'react-icons/ri';
import { IoIosHeart } from 'react-icons/io';
import GetUser from '../utils/getUser';
import '../styles/Mypage.css';

const Mypage = () => {
  const navigate = useNavigate();
  const onCancel = () => {
    navigate(-1);
  };

  // 사용자 프로필 가져오기
  const userInfo = GetUser();

  return (
    userInfo && (
      <div className='Mypage'>
        <div className='Mypage_userWrap'>
          <div className='Mypage_userImg'>
            {userInfo.userImg ? (
              <img src={userInfo.userImg} alt='userImg' />
            ) : (
              <BiSolidUser className='icon_userImg' />
            )}
          </div>
          <div className='Mypage_userName'>{userInfo.userName}</div>
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
    )
  );
};

export default Mypage;
