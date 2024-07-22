import React from 'react';
import { useParams } from 'react-router-dom';
import DisplayAlbum from './DisplayAlbum';
import GetAlbums from '../utils/getAlbums';

const Albums = () => {
  const { id } = useParams();
  const albums = GetAlbums(id);

  // 앨범 최신순 정렬
  albums.sort(function (a, b) {
    return (
      new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
    );
  });

  return (
    <div className='Albums'>
      <div className='Albums_title ArtistMusics_title'>ALBUMS</div>
      <div className='Albums_list_wrap ArtistMusics_list_wrap'>
        <ul
          className='Albums_list ArtistMusics_list'
          style={{ width: albums && albums.length * 135 }}
        >
          {albums.map((album) => {
            return (
              <li key={album.id}>
                <DisplayAlbum
                  albumArtists={album.artists}
                  albumImg={album.images[0].url}
                  albumName={album.name}
                  albumID={album.id}
                  title={'Albums'}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Albums;
