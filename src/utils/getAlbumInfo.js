import axios from 'axios';
import { useState, useEffect } from 'react';

const GetAlbumInfo = (id) => {
  const token = sessionStorage.getItem('token');
  const [albumInfo, setAlbumInfo] = useState({});

  const getAlbumInfo = async () => {
    await axios
      .get(`https://api.spotify.com/v1/albums/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const data = res.data;
        setAlbumInfo({
          albumImg: data.images[0].url,
          albumName: data.name,
          albumArtist: data.artists,
        });
      })
      .catch((e) => {
        console.log('getAlbumInfo fn 오류');
      });
  };

  useEffect(() => {
    getAlbumInfo();
  }, []);

  return albumInfo;
};

export default GetAlbumInfo;
