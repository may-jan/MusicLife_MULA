import React from 'react';
import TopTracks from './TopTracks';
import Albums from './Albums';
import '../styles/ArtistMusics.css';

const ArtistMusics = () => {
  return (
    <div className='ArtistMusics'>
      <TopTracks />
      <Albums />
    </div>
  );
};

export default ArtistMusics;
