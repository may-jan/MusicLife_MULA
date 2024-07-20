import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { MusicContext } from '../context/Context';
import '../styles/ArtistInfo.css';
import TextFlow from '../utils/TextFlow';
import GetArtistInfo from '../utils/getArtistInfo';

const ArtistInfo = () => {
  const { id } = useParams();
  const artistInfo = GetArtistInfo(id);

  const navigate = useNavigate();
  const onCancel = () => {
    navigate(-1);
  };

  const musicContext = useContext(MusicContext);
  const searchResults = JSON.parse(localStorage.getItem('searchResults'));
  const searchKey = localStorage.getItem('searchKey');
  musicContext.searchResults = searchResults;
  musicContext.searchKey = searchKey;

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
        {artistInfo && artistInfo.genres.length ? (
          <div className='ArtistsInfo_genres'>
            <div className='ArtistsInfo_genre text_overflow attachName '>
              <TextFlow text={artistInfo.genres} type='genre' />
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
      <IoIosArrowBack className='backBtn' onClick={onCancel} />
    </div>
  );
};

export default ArtistInfo;
