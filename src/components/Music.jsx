import React, { useEffect, useRef, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import { IoPlayCircleSharp } from 'react-icons/io5';
import { IoPauseCircleSharp } from 'react-icons/io5';
import TextFlow from './TextFlow';
import axios from 'axios';
import '../styles/Music.css';

const Music = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const onCancel = () => {
    navigate(-1);
  };
  const token = sessionStorage.getItem('token');
  const audioRef = useRef(null);
  const [musicInfo, setMusicInfo] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // 음악정보 가져오기
  const getMusicInfo = async () => {
    await axios
      .get(`https://api.spotify.com/v1/tracks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = res.data;
        setMusicInfo({
          albumImg: data.album.images[0].url,
          trackName: data.name,
          artistName: data.artists,
          preview: data.preview_url,
        });
      })
      .catch((e) => {
        console.log('Music 오류');
      });
  };

  useEffect(() => {
    getMusicInfo();
  }, []);

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

      <IoIosArrowBack className='backBtn' onClick={onCancel} />
    </div>
  );
};

export default Music;
