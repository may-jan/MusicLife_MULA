import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/RecommendPlaylists.css';
import GetFeaturedPlayLists from '../utils/getFeaturedPlayLists';

const RecommendPlaylists = () => {
  const token = sessionStorage.getItem('token');
  const playlists = GetFeaturedPlayLists();

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
    <h4 className='loginRequest emptyData'>로그인을 먼저 진행해주세요</h4>
  );
};

export default RecommendPlaylists;
