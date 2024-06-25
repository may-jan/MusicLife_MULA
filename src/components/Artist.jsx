import React from 'react';
import ArtistInfo from './ArtistInfo';
import ArtistMusics from './ArtistMusics';

const Artist = () => {
  return (
    <div className='Artist'>
      <ArtistInfo />
      <ArtistMusics />
    </div>
  );
};

export default Artist;
