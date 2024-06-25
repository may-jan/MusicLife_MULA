import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/AlbumTracks.css';
import TextFlow from './TextFlow';

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
        console.log('GetAlbumTracks 에러', e);
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
                <div className='AlbumTracks_container'>
                  <div className='AlbumTracks_trackNum'>
                    {track.track_number}
                  </div>
                  <div className='AlbumTracks_album_wrap'>
                    <div className='AlbumTracks_albumName text_overflow'>
                      <TextFlow text={track.name} />
                    </div>
                    <div className='AlbumTracks_albumArtist text_overflow attachName'>
                      {track &&
                        track.artists.map((artist) => {
                          return <span key={artist.id}>{artist.name}</span>;
                        })}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default AlbumTracks;
