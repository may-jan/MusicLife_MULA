import React, { useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosHeart } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import CommonListsHeader from '../components/CommonListsHeader';
import List from '../components/List';
import GetLikeTracks from '../utils/getLikeTracks';
import RemoveLikeTrack from '../utils/removeLikeTrack';
import '../styles/PlayListDetail.css';

const LikeLists = () => {
  const navigate = useNavigate();
  const onCancel = () => {
    navigate(-1);
  };

  const [likeLists, setLikeLists] = useState(null);

  useEffect(() => {
    const fetchLikeTracks = async () => {
      const data = await GetLikeTracks();
      setLikeLists(data);
    };
    fetchLikeTracks();
  }, []);

  // 하트 취소 버튼 누를 때 함수
  const removeHeart = async (e) => {
    e.preventDefault();
    const id = e.target.closest('.heart_removeBtn').id;
    const result = await RemoveLikeTrack(id);

    if (result) {
      setLikeLists((prevList) => ({
        tracks: prevList.tracks.filter((track) => track.track.id !== id),
        total: prevList.total - 1,
      }));
    } else {
      console.log('잘못된 클릭');
    }
  };

  const wrapStyle = { width: '360px', position: 'relative' };

  return (
    likeLists && (
      <div className='LikeLists' style={wrapStyle}>
        <CommonListsHeader title={'찜한 목록'} total={likeLists.total} />
        <div className='LikeLists_listWrap'>
          {likeLists.total !== 0 ? (
            likeLists.tracks.map((track) => (
              <div key={`${track.track.id}`}>
                <Link to={`/music/${track.track.id}`}>
                  <List data={track.track} />
                  <IoIosHeart
                    className='heart_removeBtn'
                    onClick={removeHeart}
                    id={track.track.id}
                  />
                </Link>
              </div>
            ))
          ) : (
            <div className='LikeLists_noList emptyData'>
              찜한 목록이 존재하지 않습니다
            </div>
          )}
        </div>
        <IoIosArrowBack className='backBtn' onClick={onCancel} />
      </div>
    )
  );
};

export default LikeLists;
