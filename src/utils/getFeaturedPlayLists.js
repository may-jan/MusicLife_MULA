import axios from 'axios';
import { useState, useEffect } from 'react';

const GetFeaturedPlayLists = () => {
  const token = sessionStorage.getItem('token');
  const [recommendPlayLists, setRecommendPlayLists] = useState([]);

  const getFeaturedPlaylist = async () => {
    await axios
      .get(`https://api.spotify.com/v1/browse/featured-playlists`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { limit: 10 },
      })
      .then((res) => {
        setRecommendPlayLists(res.data.playlists.items);
      })
      .catch((e) => {
        console.log('getFeaturedPlaylist fn 오류');
      });
  };

  useEffect(() => {
    getFeaturedPlaylist();
  }, []);

  return recommendPlayLists;
};

export default GetFeaturedPlayLists;
