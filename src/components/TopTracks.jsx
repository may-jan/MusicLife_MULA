import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DisplayAlbum from './DisplayAlbum';

const TopTracks = () => {
  const { id } = useParams();
  const token = sessionStorage.getItem('token');
  const [topTracks, setTopTracks] = useState([]);

  const searchBestTracks = async () => {
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
        console.log('TopTracks 에러');
      });
  };

  useEffect(() => {
    searchBestTracks();
  }, []);

  return (
    <div className='TopTracks'>
      <div className='TopTracks_title ArtistMusics_title'>TOP TRACKS</div>
      <div className='TopTracks_list_wrap ArtistMusics_list_wrap'>
        {topTracks.length ? (
          <ul
            className='TopTracks_list ArtistMusics_list'
            style={{ width: topTracks && topTracks.length * 135 }}
          >
            {topTracks.map((track) => {
              return (
                <li key={track.id}>
                  <DisplayAlbum
                    albumArtists={track.artists}
                    albumImg={track.album.images[0].url}
                    albumName={track.name}
                    albumID={track.id}
                  />
                </li>
              );
            })}
          </ul>
        ) : (
          <div className='noTracks'>Top Track이 존재하지 않습니다</div>
        )}
      </div>
    </div>
  );
};

export default TopTracks;
