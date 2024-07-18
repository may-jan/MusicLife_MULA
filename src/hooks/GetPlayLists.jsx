import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/GetPlayLists.css';
import TextFlow from '../utils/TextFlow';

const GetPlayLists = () => {
  const token = sessionStorage.getItem('token');
  const [playListInfo, setPlayListInfo] = useState();

  const getPL = async () => {
    await axios
      .get(`https://api.spotify.com/v1/me/playlists`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = res.data;
        setPlayListInfo(data.items);
      })
      .catch((e) => {
        console.log('GetPlayLists 오류');
      });
  };

  useEffect(() => {
    getPL();
  }, []);

  return (
    playListInfo && (
      <div className='GetPlayLists'>
        {playListInfo.map((info) => {
          return (
            <Link to={info.id} key={info.id}>
              <div className='GetPlayLists_wrap'>
                <div className='GetPlayLists_img'>
                  <img src={info.images[0].url} alt='img' />
                </div>
                <div className='GetPlayLists_listWrap'>
                  <div className='GetPlayLists_listName text_overflow'>
                    <TextFlow text={info.name} />
                  </div>
                  <div className='GetPlayLists_listTotal'>
                    {info.tracks.total}곡
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

export default GetPlayLists;
