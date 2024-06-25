import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { MusicContext } from '../context/Context';
import '../styles/ArtistInfo.css';
import TextFlow from './TextFlow';

const ArtistInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const onCancel = () => {
    navigate(-1);
  };

  const musicContext = useContext(MusicContext);
  const searchResults = JSON.parse(localStorage.getItem('searchResults'));
  const artistInfo = JSON.parse(localStorage.getItem('artistInfo'));
  const searchKey = localStorage.getItem('searchKey');
  musicContext.searchResults = searchResults;
  musicContext.artistInfo = artistInfo;
  musicContext.searchKey = searchKey;

  searchResults.map((artist) => {
    if (artist.id === id) {
      localStorage.setItem('artistInfo', JSON.stringify(artist));
    }
  });

  return (
    <div className='ArtistInfo'>
      <div className='ArtistsInfo_artistImg'>
        {artistInfo && artistInfo.images.length ? (
          <img src={artistInfo.images[0].url} alt='artistImg' />
        ) : (
          <div className='artistInfo_no_img'>NO IMAGE</div>
        )}
      </div>
      <div className='ArtistsInfo_shadow'></div>
      <div className='ArtistsInfo_artistName text_overflow'>
        <TextFlow text={artistInfo && artistInfo.name} />
      </div>
      <div className='ArtistsInfo'>
        <div className='ArtistsInfo_followers'>
          followers : {artistInfo && artistInfo.followers.total}
        </div>
        <div className='ArtistsInfo_genres'>
          {artistInfo && artistInfo.genres.length ? (
            <div className='ArtistsInfo_genre attachName'>
              {artistInfo.genres &&
                artistInfo.genres.map((gen) => <span key={gen}>{gen}</span>)}
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      <IoIosArrowBack className='backBtn' onClick={onCancel} />
    </div>
  );
};

export default ArtistInfo;
