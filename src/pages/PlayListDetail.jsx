import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { HiOutlineMinusCircle } from 'react-icons/hi2';
import List from '../components/List';
import CommonListsHeader from '../components/CommonListsHeader';
import GetPlayListInfo from '../utils/getPlayListInfo';
import RemovePlayList from '../utils/removePlayList';
import GetPlayListItems from '../utils/getPlayListItems';
import '../styles/PlayListDetail.css';

const PlayListDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const onCancel = () => {
    navigate(-1);
  };

  const [playListInfo, setPlayListInfo] = useState(null);
  const [playListItems, setPlayListItems] = useState(null);

  useEffect(() => {
    const fetchPlayListInfo = async () => {
      const data = await GetPlayListInfo(id);
      setPlayListInfo(data);
    };
    const fetchPlayListItems = async () => {
      const data = await GetPlayListItems(id);
      setPlayListItems(data);
    };
    fetchPlayListInfo();
    fetchPlayListItems();
  }, [id]);

  const removeMusic = async (e) => {
    e.preventDefault();
    if (e.target.closest('.List_removeBtn')) {
      const data = JSON.parse(e.target.closest('.List_removeBtn').id);
      const playListID = id;
      const albumUri = data.uri;
      const plSnapshotID = playListInfo.plSnapshotID;
      const result = await RemovePlayList({
        playListID,
        albumUri,
        plSnapshotID,
      });

      // RemovePlayList 함수에서 성공적으로 삭제된 경우 -> 바뀐 정보를 업데이트하여 UI 갱신
      if (result) {
        setPlayListInfo((prevInfo) => ({
          ...prevInfo,
          plTracks: prevInfo.plTracks.filter(
            (track) => track.track.uri !== albumUri
          ),
        }));
        setPlayListItems(
          playListItems.filter((li) => li.track.uri !== albumUri)
        );
      }
    } else {
      console.log('잘못된 클릭');
    }
  };

  const wrapStyle = { width: '360px', position: 'relative' };

  return (
    playListInfo && (
      <div className='PlayListDetail' style={wrapStyle}>
        <div className='PlayListDetail_listHeader'>
          <CommonListsHeader
            title={'플레이리스트'}
            data={playListInfo}
            name={'PlayListDetail'}
          />
        </div>
        <div className='PlayListDetail_listWrap'>
          {playListItems && playListItems.length !== 0 ? (
            playListItems.map((item) => (
              <div key={item.track.uri}>
                <Link to={`/music/${item.track.id}`}>
                  <List data={item.track} playListID={id} />
                </Link>
                <HiOutlineMinusCircle
                  className='List_removeBtn'
                  onClick={removeMusic}
                  id={JSON.stringify({
                    id: item.track.id,
                    uri: item.track.uri,
                  })}
                />
              </div>
            ))
          ) : (
            <div className='PlayListDetail_noList emptyData'>
              <p>음악이 존재하지 않습니다</p>
            </div>
          )}
        </div>
        <IoIosArrowBack className='backBtn' onClick={onCancel} />
      </div>
    )
  );
};

export default PlayListDetail;
