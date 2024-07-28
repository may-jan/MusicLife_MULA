import React, { useEffect } from 'react';
import { RiPlayListFill } from 'react-icons/ri';
import { IoIosHeart } from 'react-icons/io';
import TextFlow from '../utils/TextFlow';
import '../styles/CommonListsHeader.css';

const CommonListsHeader = ({ title, data, name, total }) => {
  useEffect(() => {
    if (name === 'PlayListDetail') {
      data.plTotal = data && data.plTracks.length - 1;
    }
  }, [data]);

  return (
    <div className='CommonListsHeader'>
      {title === '플레이리스트' ? (
        !data ? (
          <>
            <RiPlayListFill className='CommonListsHeader_icon' />
            <div className='CommonListsHeader_title'>플레이리스트</div>
          </>
        ) : (
          <>
            <div className='CommonListsHeader_title CommonListsHeader_listName text_overflow'>
              <TextFlow text={data.plName} />
            </div>
            <div className='CommonListsHeader_listTotal'>{data.plTotal}곡</div>
          </>
        )
      ) : (
        <>
          <IoIosHeart className='CommonListsHeader_icon' />
          <div className='CommonListsHeader_title'>찜한 목록</div>
          <div className='CommonListsHeader_listTotal'>{total}곡</div>
        </>
      )}
    </div>
  );
};

export default CommonListsHeader;
