import React from 'react';
import AlbumInfo from './AlbumInfo';
import AlbumTracks from './AlbumTracks';

const AlbumList = () => {
  return (
    <div className='Album'>
      <AlbumInfo />
      <AlbumTracks />
    </div>
  );
};

export default AlbumList;
