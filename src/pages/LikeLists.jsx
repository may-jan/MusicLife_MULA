import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import CommonListsHeader from '../components/CommonListsHeader';

const LikeLists = () => {
  const navigate = useNavigate();
  const onCancel = () => {
    navigate(-1);
  };

  const wrapStyle = { width: '360px', position: 'relative' };

  return (
    <div className='LikeLists' style={wrapStyle}>
      <CommonListsHeader title={'찜한 목록'} />
      <div className='LikeLists_listWrap'>
        <ul>
          <li></li>
        </ul>
      </div>
      <IoIosArrowBack className='backBtn' onClick={onCancel} />
    </div>
  );
};

export default LikeLists;
