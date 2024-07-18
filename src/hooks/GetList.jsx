import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import axios from 'axios';
import List from '../components/List';
import CommonListsHeader from '../components/CommonListsHeader';

const GetList = () => {
  const { id } = useParams();
  const token = sessionStorage.getItem('token');
  const [musicInfo, setMusicInfo] = useState();
  const navigate = useNavigate();
  const onCancel = () => {
    navigate(-1);
  };

  const getListInfo = async () => {
    await axios
      .get(`https://api.spotify.com/v1/playlists/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = res.data;
        setMusicInfo({
          plName: data.name,
          plTotal: data.tracks.total,
          plTracks: data.tracks.items,
        });
      })
      .catch((e) => {
        console.log('GetList 오류');
      });
  };

  useEffect(() => {
    getListInfo();
  }, []);

  const wrapStyle = { width: '360px', position: 'relative' };

  return (
    musicInfo && (
      <div className='GetList' style={wrapStyle}>
        <div className='GetList_listHeader'>
          <CommonListsHeader title={'플레이리스트'} data={musicInfo} />
        </div>
        <div className='GetList_listWrap'>
          {musicInfo.plTracks.map((track, idx) => {
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

export default GetList;
