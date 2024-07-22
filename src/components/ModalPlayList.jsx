import React, { useState } from 'react';
import AddPlayList from '../utils/addPlayList';
import '../styles/ModalPlayList.css';

const ModalPlayList = ({ playLists, musicInfo, onClose }) => {
  const [playListID, setPlayListID] = useState(playLists[0].id);
  const selectOption = (e) => {
    setPlayListID(e.target.value);
  };

  const btnClick = () => {
    AddPlayList(musicInfo, playListID, onClose);
  };

  return (
    <div className='ModalPlayList'>
      <div className='ModalPlayList_closeBtn' onClick={onClose}>
        &times;
      </div>
      <div className='ModalPlayList_selectWrap'>
        <select onChange={selectOption}>
          {playLists.map((playList) => (
            <option key={playList.id} value={playList.id}>
              {playList.name}
            </option>
          ))}
        </select>
        <button onClick={btnClick}>선택</button>
      </div>
    </div>
  );
};

export default ModalPlayList;
