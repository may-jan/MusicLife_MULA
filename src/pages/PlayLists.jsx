import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosAddCircle } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import CommonListsHeader from '../components/CommonListsHeader';
import PlayList from '../components/PlayList';
import CreatePlayList from '../utils/createPlayList';
import GetUser from '../utils/getUser';
import '../styles/PlayLists.css';

const PlayLists = () => {
  const navigate = useNavigate();
  const onCancel = () => {
    navigate(-1);
  };

  const userInfo = GetUser();
  const clickedCreateBtn = () => {
    userInfo && CreatePlayList(userInfo.userID);
  };

  const wrapStyle = { width: '360px', position: 'relative' };

  return (
    <div className='PlayLists' style={wrapStyle}>
      <CommonListsHeader title={'플레이리스트'} />
      <IoIosArrowBack className='backBtn' onClick={onCancel} />
      <PlayList />
      <IoIosAddCircle
        className='icon_createPlayList'
        onClick={clickedCreateBtn}
      />
    </div>
  );
};

export default PlayLists;
