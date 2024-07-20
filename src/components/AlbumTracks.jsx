import React from 'react';
import { Link, useParams } from 'react-router-dom';
import List from '../components/List';
import '../styles/AlbumTracks.css';
import GetTrackLists from '../utils/getTrackLists';

const AlbumTracks = () => {
  const { id } = useParams();
  const trackList = GetTrackLists(id);

  return (
    <div className='AlbumTracks'>
      <div className='AlbumTracks_wrap'>
        {trackList &&
          trackList.map((track) => {
            return (
              <Link to={`/music/${track.id}`} key={track.id}>
                <List shape={'AlbumTracks'} data={track} />
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default AlbumTracks;
