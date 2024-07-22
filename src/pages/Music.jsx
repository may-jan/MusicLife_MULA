import React, { useEffect, useRef, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import { IoPlayCircleSharp } from 'react-icons/io5';
import { IoPauseCircleSharp } from 'react-icons/io5';
import { PiMusicNotesPlusFill } from 'react-icons/pi';
import { IoIosHeart } from 'react-icons/io';
import { IoIosHeartEmpty } from 'react-icons/io';
import TextFlow from '../utils/TextFlow';
import GetMusicInfo from '../utils/getMusicInfo';
import GetPlayLists from '../utils/getPlayLists';
import ModalPlayList from '../components/ModalPlayList';
import '../styles/Music.css';

const Music = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const onCancel = () => {
    navigate(-1);
  };

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 음악정보 가져오기
  const musicInfo = GetMusicInfo(id);

  // 플레이리스트 정보 가져오기
  const playLists = GetPlayLists();

  // 재생 플레이어
  useEffect(() => {
    const UpdateTime = () => {
      const currentProgress =
        (audioRef.current.currentTime / audioRef.current.duration) * 88;
      setProgress(currentProgress);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      audioRef.current.currentTime = 0;
    };

    const audio = audioRef.current;
    audio.addEventListener('timeupdate', UpdateTime);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', UpdateTime);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  // 음악 재생, 일시정지 버튼
  const clickPlayBtn = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // 하트 버튼 (찜하기 되어있는 상태, 구현 미완성)
  const clickHeartBtn = () => {
    const test = window.confirm('찜한 목록에서 삭제하시겠습니까?');
    if (test) {
      console.log('확인누름');
    } else {
      console.log('취소누름');
    }
  };

  // 빈하트 버튼 (찜하기 안되어있는 상태, 구현 미완성)
  const clickEmptyHeartBtn = () => {
    const test = window.confirm('찜한 목록에 추가하시겠습니까?');
    if (test) {
      console.log('확인누름');
    } else {
      console.log('취소누름');
    }
  };

  // 플레이리스트 추가하기 버튼
  const clickAddMusicBtn = () => {
    setIsModalOpen(true);
  };

  return (
    <div className='Music'>
      <div className='Music_colorBox'></div>

      <div className='Music_albumImg'>
        <img src={musicInfo.albumImg} alt='albumImg' />
      </div>

      <div className='Music_info'>
        <div className='Music_trackName text_overflow'>
          <TextFlow text={musicInfo.trackName} />
        </div>
        <div className='Music_artistName text_overflow attachName'>
          <TextFlow text={musicInfo.artistName} />
        </div>
      </div>

      <div className='Music_player'>
        <div className='Music_preview'>미리듣기</div>
        <div className='Music_playBtn'>
          <button onClick={clickPlayBtn}>
            {isPlaying ? <IoPauseCircleSharp /> : <IoPlayCircleSharp />}
          </button>
        </div>
        <div className='Music_progressBar'>
          <div className='progress' style={{ left: `${progress}%` }}></div>
        </div>
        <audio ref={audioRef} src={musicInfo.preview}></audio>
      </div>

      <div className='Music_btns'>
        {/* 찜하기 버튼 구현 미완성 */}
        {/* <IoIosHeart className='icon_heart' onClick={clickHeartBtn} /> */}
        <IoIosHeartEmpty
          className='icon_emptyHeart'
          onClick={clickEmptyHeartBtn}
        />
        <PiMusicNotesPlusFill
          className='icon_addMusic'
          onClick={clickAddMusicBtn}
        />
        {isModalOpen && (
          <ModalPlayList
            playLists={playLists}
            musicInfo={musicInfo}
            onClose={() => {
              setIsModalOpen(false);
            }}
          />
        )}
      </div>

      <IoIosArrowBack className='backBtn' onClick={onCancel} />
    </div>
  );
};

export default Music;
