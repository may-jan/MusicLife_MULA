import axios from 'axios';
import { useState, useEffect } from 'react';

const GetTrackLists = (id) => {
  const token = sessionStorage.getItem('token');
  const [trackList, setTrackList] = useState();

  const getAlbumTracks = async (id) => {
    await axios
      .get(`https://api.spotify.com/v1/albums/${id}/tracks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTrackList(res.data.items);
      })
      .catch((e) => {
        console.log('getTrackLists fn 오류');
      });
  };

  useEffect(() => {
    getAlbumTracks(id);
  }, []);

  return trackList;
};

export default GetTrackLists;
