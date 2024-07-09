import React from 'react';
import AlbumInfo from '../components/AlbumInfo';
import AlbumTracks from '../components/AlbumTracks';

const AlbumList = () => {
  return (
    <div className='Album'>
      <AlbumInfo />
      <AlbumTracks />
    </div>
  );
};

export default AlbumList;
