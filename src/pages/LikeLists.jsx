import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosHeart } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import CommonListsHeader from '../components/CommonListsHeader';
import List from '../components/List';
import askAlert from '../utils/askAlert';
import resultAlert from '../utils/resultAlert';
import GetLikeTracks from '../utils/getLikeTracks';
import '../styles/PlayListDetail.css';

const LikeLists = () => {
  const navigate = useNavigate();
  const onCancel = () => {
    navigate(-1);
  };

  const wrapStyle = { width: '360px', position: 'relative' };

  const likeTracks = GetLikeTracks();

  // 하트 취소 버튼 누를 때 함수
  const removeHeart = async () => {
    const result = askAlert('찜한 목록에서 삭제하시겠습니까?');
    if (await result) {
      // 찜한 목록에서
      // 삭제하는 코드
      resultAlert('삭제되었습니다', 'success');
    } else {
      resultAlert('취소되었습니다', 'error');
    }
  };

  return (
    <div className='LikeLists' style={wrapStyle}>
      <CommonListsHeader title={'찜한 목록'} />
      <div className='LikeLists_listWrap'>
        {likeTracks &&
          likeTracks.map((track) => (
            <div key={`${track.track.id}`}>
              <Link to={`/music/${track.track.id}`}>
                <List data={track.track} />
                <IoIosHeart className='heart_removeBtn' onClick={removeHeart} />
              </Link>
            </div>
          ))}
      </div>

      <IoIosArrowBack className='backBtn' onClick={onCancel} />
    </div>
  );
};

export default LikeLists;
