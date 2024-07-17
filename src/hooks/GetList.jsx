import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetList = ({ id }) => {
  const token = sessionStorage.getItem('token');
  const [playListInfo, setPlayListInfo] = useState();

  const getListInfo = async () => {
    await axios
      .get(`https://api.spotify.com/v1/playlists/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = res.data;
        console.log(data);
        setPlayListInfo({
          plName: data.name,
          plTotal: data.tracks.total,
          plTracks: data.tracks.items,
        });
      })
      .catch((e) => {
        console.log('GetList 오류');
      });
  };

  useEffect(() => {
    getListInfo();
  }, []);

  return (
    playListInfo && (
      <div className='GetList'>
        <div>
          {playListInfo.plTracks.map((track) => {
            return (
              <div key={track.added_at}>
                <hr />
                <span>가수이름 : {track.track.album.artists[0].name}</span>
                <br />
                <span>앨범 ID :{track.track.album.id}</span>
                <br />
                <span>곡 ID :{track.track.id}</span>
                <br />
                <span>곡 제목 : {track.track.name}</span>
                <br />
                <div>
                  곡 이미지 :
                  <img
                    src={track.track.album.images[0].url}
                    width='50'
                    alt='img'
                  />
                </div>
                <br />
                <hr />
              </div>
            );
          })}
        </div>
      </div>
    )
  );
};

export default GetList;
