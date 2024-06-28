import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/RecommendPlaylists.css';

const RecommendPlaylists = () => {
  const token = sessionStorage.getItem('token');
  const [playlists, setPlaylists] = useState([]);

  const getPlaylist = async () => {
    await axios
      .get(`https://api.spotify.com/v1/browse/featured-playlists`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { limit: 10 },
      })
      .then((res) => {
        setPlaylists(res.data.playlists.items);
      })
      .catch((e) => {
        console.log('RecommendPlaylists 에러');
      });
  };

  useEffect(() => {
    getPlaylist();
  }, []);

  return token ? (
    <div className='RecommendPlaylists'>
      <h4>추천 플레이리스트 🎧</h4>
      {playlists.map((list) => {
        return (
          <div className='RecommendPlaylist' key={list.id}>
            <Link to={list.external_urls.spotify} target='_blank'>
              <img src={list.images[0].url} alt='playlistCoverImg' />
              <div className='RecommendPlaylists_playlistName'>{list.name}</div>
              <div className='RecommendPlaylists_playlistDes'>
                {list.description}
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  ) : (
    <h4 className='loginRequest'>로그인을 먼저 진행해주세요</h4>
  );
};

export default RecommendPlaylists;
