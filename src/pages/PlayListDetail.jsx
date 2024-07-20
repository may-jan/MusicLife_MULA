import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import List from '../components/List';
import CommonListsHeader from '../components/CommonListsHeader';
import GetPlayListInfo from '../utils/getPlayListInfo';

const PlayListDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const onCancel = () => {
    navigate(-1);
  };

  const playListInfo = GetPlayListInfo(id);

  const wrapStyle = { width: '360px', position: 'relative' };

  return (
    playListInfo && (
      <div className='GetList' style={wrapStyle}>
        <div className='GetList_listHeader'>
          <CommonListsHeader title={'플레이리스트'} data={playListInfo} />
        </div>
        <div className='GetList_listWrap'>
          {playListInfo.plTracks.map((track, idx) => {
            return (
              <Link
                to={`/music/${track.track.id}`}
                key={`${track.added_at}_${idx}`}
              >
                <List data={track.track} />
              </Link>
            );
          })}
        </div>
        <IoIosArrowBack className='backBtn' onClick={onCancel} />
      </div>
    )
  );
};

export default PlayListDetail;
