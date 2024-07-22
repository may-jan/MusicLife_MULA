import axios from 'axios';
import { useState, useEffect } from 'react';

const GetMusicInfo = (id) => {
  const token = sessionStorage.getItem('token');
  const [musicInfo, setMusicInfo] = useState({});

  const getMusicInfo = async () => {
    await axios
      .get(`https://api.spotify.com/v1/tracks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = res.data;
        setMusicInfo({
          albumImg: data.album.images[0].url,
          trackName: data.name,
          artistName: data.artists,
          preview: data.preview_url,
          uri: data.uri,
        });
      })
      .catch((e) => {
        console.log('getMusicInfo fn 오류');
      });
  };

  useEffect(() => {
    getMusicInfo(id);
  }, []);

  return musicInfo;
};

export default GetMusicInfo;
