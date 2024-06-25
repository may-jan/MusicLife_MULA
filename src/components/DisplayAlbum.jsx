import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/DisplayAlbum.css';

const DisplayAlbum = ({
  albumArtists,
  albumImg,
  albumName,
  albumID,
  title,
}) => {
  const renderAlbum = () => {
    return (
      <>
        <div>
          <Link
            to={title === 'Albums' ? `/album/${albumID}` : `/music/${albumID}`}
          >
            <div className={`dpAlbum_albumImg ${albumID}`}>
              <img src={albumImg} alt='albumImg' className='albumID' />
            </div>
          </Link>
          <div className='dpAlbum_albumName text_overflow'>{albumName}</div>
          <div className='dpAlbum_albumArtist text_overflow attachName'>
            {albumArtists &&
              albumArtists.map((artist) => (
                <span key={artist.id}>{artist.name}</span>
              ))}
          </div>
        </div>
      </>
    );
  };

  return <div className='DisplayAlbum'>{renderAlbum()}</div>;
};

export default DisplayAlbum;
