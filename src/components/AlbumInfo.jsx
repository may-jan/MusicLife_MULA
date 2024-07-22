import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/AlbumInfo.css';
import TextFlow from '../utils/TextFlow';
import GetAlbumInfo from '../utils/getAlbumInfo';

const AlbumInfo = () => {
  const { id } = useParams();
  const albumInfo = GetAlbumInfo(id);

  const navigate = useNavigate();
  const onCancel = () => {
    navigate(-1);
  };

  return (
    <div className='AlbumInfo'>
      <div className='AlbumInfo_albumImg'>
        {albumInfo ? (
          <img src={albumInfo.albumImg} alt='albumImg' />
        ) : (
          <div className='AlbumInfo_no_img'>NO IMAGE</div>
        )}
      </div>
      <div className='AlbumInfo_albumImg_shadow'></div>
      <div className='AlbumInfo_albumName text_overflow'>
        <TextFlow text={albumInfo.albumName} />
      </div>
      <div className='AlbumInfo_albumArtist attachName'>
        <TextFlow text={albumInfo.albumArtist} />
      </div>
      <IoIosArrowBack className='backBtn' onClick={onCancel} />
    </div>
  );
};

export default AlbumInfo;
