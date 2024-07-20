import axios from 'axios';
import { useState, useEffect } from 'react';

const GetAlbums = (id) => {
  const token = sessionStorage.getItem('token');
  const [albums, setAlbums] = useState([]);

  const searchAlbums = async () => {
    await axios
      .get(`https://api.spotify.com/v1/artists/${id}/albums`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAlbums(res.data.items);
      })
      .catch((e) => {
        console.log('getAlbums fn 오류');
      });
  };

  useEffect(() => {
    searchAlbums(id);
  }, []);

  return albums;
};

export default GetAlbums;
