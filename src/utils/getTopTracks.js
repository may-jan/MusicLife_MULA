import axios from 'axios';
import { useState, useEffect } from 'react';

const GetTopTracks = (id) => {
  const token = sessionStorage.getItem('token');
  const [topTracks, setTopTracks] = useState([]);

  const getTopTracks = async () => {
    await axios
      .get(`https://api.spotify.com/v1/artists/${id}/top-tracks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTopTracks(res.data.tracks);
      })
      .catch((e) => {
        console.log('getTopTracks fn 오류');
      });
  };

  useEffect(() => {
    getTopTracks(id);
  }, []);

  return topTracks;
};

export default GetTopTracks;
