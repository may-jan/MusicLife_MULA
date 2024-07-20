import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/PlayList.css';
import TextFlow from '../utils/TextFlow';
import GetPlayLists from '../utils/getPlayLists';

const PlayList = () => {
  const playLists = GetPlayLists();

  return (
    playLists && (
      <div className='PlayList'>
        {playLists.map((playList) => {
          return (
            <Link to={playList.id} key={playList.id}>
              <div className='PlayList_wrap'>
                <div className='PlayList_img'>
                  <img src={playList.images[0].url} alt='img' />
                </div>
                <div className='PlayList_listWrap'>
                  <div className='PlayList_listName text_overflow'>
                    <TextFlow text={playList.name} />
                  </div>
                  <div className='PlayList_listTotal'>
                    {playList.tracks.total}곡
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    )
  );
};

export default PlayList;
