import axios from 'axios';
import { useState, useEffect } from 'react';

const GetPlayLists = () => {
  const token = sessionStorage.getItem('token');
  const [playListInfo, setPlayListInfo] = useState();

  const getPlayLists = async () => {
    await axios
      .get(`https://api.spotify.com/v1/me/playlists`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = res.data;
        setPlayListInfo(data.items);
      })
      .catch((e) => {
        console.log('getPlayLists fn 오류');
      });
  };

  playListInfo &&
    localStorage.setItem('playLists', JSON.stringify(playListInfo));

  useEffect(() => {
    getPlayLists();
  }, []);

  return playListInfo;
};

export default GetPlayLists;
