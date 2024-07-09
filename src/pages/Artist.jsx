import React from 'react';
import ArtistInfo from '../components/ArtistInfo';
import ArtistMusics from '../components/ArtistMusics';

const Artist = () => {
  return (
    <div className='Artist'>
      <ArtistInfo />
      <ArtistMusics />
    </div>
  );
};

export default Artist;
