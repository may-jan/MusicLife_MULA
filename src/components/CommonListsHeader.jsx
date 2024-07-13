import React from 'react';
import { RiPlayListFill } from 'react-icons/ri';
import { IoIosHeart } from 'react-icons/io';
import '../styles/CommonListsHeader.css';

const CommonListsHeader = ({ title }) => {
  return (
    <div className='CommonListsHeader'>
      {title === '플레이리스트' ? (
        <>
          <RiPlayListFill className='CommonListsHeader_icon' />
          <div className='CommonListsHeader_title'>플레이리스트</div>
        </>
      ) : (
        <>
          <IoIosHeart className='CommonListsHeader_icon' />
          <div className='CommonListsHeader_title'>찜한 목록</div>
        </>
      )}
    </div>
  );
};

export default CommonListsHeader;
