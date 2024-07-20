import axios from 'axios';
import { useState, useEffect } from 'react';

const GetPlayListInfo = (id) => {
  const token = sessionStorage.getItem('token');
  const [musicInfo, setMusicInfo] = useState();

  const getPlayListInfo = async () => {
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
        console.log('getPlayListInfo fn 오류');
      });
  };

  useEffect(() => {
    getPlayListInfo(id);
  }, []);

  return musicInfo;
};

export default GetPlayListInfo;
