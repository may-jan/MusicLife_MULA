import axios from 'axios';
import { useState, useEffect } from 'react';

const GetArtistInfo = (id) => {
  const [artistInfo, setArtistInfo] = useState(null);
  const token = sessionStorage.getItem('token');

  const getArtistInfo = async () => {
    await axios
      .get(`https://api.spotify.com/v1/artists/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setArtistInfo(res.data);
      })
      .catch((e) => {
        console.log('ArtistInfo 에러');
      });
  };

  useEffect(() => {
    getArtistInfo(id);
  }, []);

  return artistInfo;
};

export default GetArtistInfo;
