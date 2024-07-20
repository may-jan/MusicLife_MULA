import React from 'react';
import { useParams } from 'react-router-dom';
import DisplayAlbum from './DisplayAlbum';
import GetTopTracks from '../utils/getTopTracks';

const TopTracks = () => {
  const { id } = useParams();
  const topTracks = GetTopTracks(id);

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
