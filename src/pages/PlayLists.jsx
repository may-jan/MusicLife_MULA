import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import CommonListsHeader from '../components/CommonListsHeader';
import PlayList from '../components/PlayList';

const PlayLists = () => {
  const navigate = useNavigate();
  const onCancel = () => {
    navigate(-1);
  };

  const wrapStyle = { width: '360px', position: 'relative' };

  return (
    <div className='PlayLists' style={wrapStyle}>
      <CommonListsHeader title={'플레이리스트'} />
      <IoIosArrowBack className='backBtn' onClick={onCancel} />
      <PlayList />
    </div>
  );
};

export default PlayLists;
