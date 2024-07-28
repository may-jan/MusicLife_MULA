import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MusicContext } from '../context/Context';
import RecommendPlaylists from './RecommendPlaylists';
import '../styles/Result.css';

const Result = () => {
  const musicContext = useContext(MusicContext);
  const searchResults = musicContext.searchResults;
  const searchKey = musicContext.searchKey;
  localStorage.setItem('searchResults', JSON.stringify(searchResults));
  localStorage.setItem('searchKey', searchKey);

  let isFirst = true;

  if (!searchKey) {
    isFirst = true;
  } else {
    isFirst = false;
  }

  const renderArtists = () => {
    if (isFirst) {
      return <RecommendPlaylists />;
    } else {
      if (searchResults.length) {
        return searchResults.map((artist) => (
          <div className='Result_artist' key={artist.id}>
            <Link to={`/artist/${artist.id}`}>
              <div className='Result_artistImg'>
                {artist.images.length ? (
                  <img
                    width={'100%'}
                    src={artist.images[0].url}
                    alt='artistImg'
                  />
                ) : (
                  <div className='Result_noImg emptyImg'>NO IMAGE</div>
                )}
              </div>
              <div className='Result_artistName'>{artist.name}</div>
            </Link>
          </div>
        ));
      } else {
        return (
          <div className='Result_noResult emptyData'>검색 결과가 없습니다</div>
        );
      }
    }
  };

  return <div className='Result'>{renderArtists()}</div>;
};

export default Result;
