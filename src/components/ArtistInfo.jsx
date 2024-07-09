import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { MusicContext } from '../context/Context';
import '../styles/ArtistInfo.css';
import TextFlow from '../utils/TextFlow';
import axios from 'axios';

const ArtistInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const onCancel = () => {
    navigate(-1);
  };

  const token = sessionStorage.getItem('token');
  const musicContext = useContext(MusicContext);
  const [artistInfo, setArtistInfo] = useState(null);
  const searchResults = JSON.parse(localStorage.getItem('searchResults'));
  const searchKey = localStorage.getItem('searchKey');
  musicContext.searchResults = searchResults;
  musicContext.searchKey = searchKey;

  const getArtistInfo = async () => {
    await axios
      .get(`https://api.spotify.com/v1/artists/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setArtistInfo(res.data);
      })
      .catch((e) => {
        console.log('ArtistInfo 에러');
      });
  };

  useEffect(() => {
    getArtistInfo();
  }, [id]);

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
