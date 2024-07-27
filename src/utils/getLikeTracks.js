import axios from 'axios';
import { useState, useEffect } from 'react';

const GetLikeTracks = () => {
  const token = sessionStorage.getItem('token');
  const [likeTracks, setLikeTracks] = useState([]);

  const getLikeTracks = async () => {
    await axios
      .get(`https://api.spotify.com/v1/me/tracks`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { limit: 50 },
      })
      .then((res) => {
        setLikeTracks(res.data.items);
      })
      .catch((e) => {
        console.log('getLikeTracks fn 오류');
      });
  };
  useEffect(() => {
    getLikeTracks();
  }, []);

  return likeTracks;
};

export default GetLikeTracks;
