import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DisplayAlbum from './DisplayAlbum';

const Albums = () => {
  const { id } = useParams();
  const token = sessionStorage.getItem('token');
  const [albums, setAlbums] = useState([]);

  const searchAlbums = async () => {
    await axios
      .get(`https://api.spotify.com/v1/artists/${id}/albums`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAlbums(res.data.items);
      })
      .catch((e) => {
        console.log(e);
        console.log('Albums에러');
      });
  };

  useEffect(() => {
    searchAlbums();
  }, []);

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
