import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GetList from './GetList';

const GetPlayLists = () => {
  const token = sessionStorage.getItem('token');
  const [playListID, setPlayListID] = useState([]);
  const [playListInfo, setPlayListInfo] = useState();

  const getPL = async () => {
    await axios
      .get(`https://api.spotify.com/v1/me/playlists`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = res.data;
        const id = data.items.map((item) => item.id);
        setPlayListID(id);
      })
      .catch((e) => {
        console.log('GetPlayLists getPL 오류');
      });
  };

  const getList = async () => {
    await axios
      .get(`https://api.spotify.com/v1/playlists/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = res.data;
        setPlayListInfo({
          plName: data.name,
          plTotal: data.tracks.total,
          plTracks: data.tracks.items,
        });
      })
      .catch((e) => {
        console.log('GetPlayLists getList 오류');
      });
  };

  useEffect(() => {
    getPL();
    getList();
  }, []);

  return (
    playListInfo && (
      <div className='GetPlayLists'>
        {playListID &&
          playListID.map((id) => (
            <div>
              <div>플리 이름 : {playListInfo.plName}</div>
              <div>{playListInfo.plTotal}곡</div>
              <GetList id={id} />
            </div>
          ))}
        <div></div>
      </div>
    )
  );
};

export default GetPlayLists;
