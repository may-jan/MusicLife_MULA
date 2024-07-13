import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import CommonListsHeader from '../components/CommonListsHeader';

const PlayLists = () => {
  const navigate = useNavigate();
  const onCancel = () => {
    navigate(-1);
  };

  const wrapStyle = { width: '360px', position: 'relative' };

  return (
    <div className='PlayLists' style={wrapStyle}>
      <CommonListsHeader title={'플레이리스트'} />
      <div className='PlayLists_listWrap'>
        <ul>
          <li></li>
        </ul>
      </div>
      <IoIosArrowBack className='backBtn' onClick={onCancel} />
    </div>
  );
};

export default PlayLists;
