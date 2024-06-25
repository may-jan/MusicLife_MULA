import React, { useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/AlbumInfo.css';
import TextFlow from './TextFlow';

const AlbumInfo = () => {
  const { id } = useParams();
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();
  const onCancel = () => {
    navigate(-1);
  };
  const [albumInfo, setAlbumInfo] = useState({});

  const getAlbumInfo = async () => {
    await axios
      .get(`https://api.spotify.com/v1/albums/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const data = res.data;
        setAlbumInfo({
          albumImg: data.images[0].url,
          albumName: data.name,
          albumArtist: data.artists,
        });
      })
      .catch((e) => {
        console.log('AlbumInfo 에러');
      });
  };

  useEffect(() => {
    getAlbumInfo();
  }, []);

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
        {albumInfo.albumArtist &&
          albumInfo.albumArtist.map((artist) => (
            <span key={artist.id}>{artist.name}</span>
          ))}
      </div>
      <IoIosArrowBack className='backBtn' onClick={onCancel} />
    </div>
  );
};

export default AlbumInfo;
