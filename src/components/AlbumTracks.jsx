import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import List from '../components/List';
import '../styles/AlbumTracks.css';

const AlbumTracks = () => {
  const { id } = useParams();
  const token = sessionStorage.getItem('token');
  const [trackList, setTrackList] = useState();

  const getAlbumTracks = async () => {
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
        console.log('GetAlbumTracks 에러');
      });
  };

  useEffect(() => {
    getAlbumTracks();
  }, []);

  return (
    <div className='AlbumTracks'>
      <div className='AlbumTracks_wrap'>
        {trackList &&
          trackList.map((track) => {
            return (
              <Link to={`/music/${track.id}`} key={track.id}>
                <List shape={'AlbumTracks'} data={track} />
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default AlbumTracks;
