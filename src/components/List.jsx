import React from 'react';
import TextFlow from '../utils/TextFlow';
import '../styles/List.css';

const List = ({ shape, data }) => {
  return (
    <div className='List'>
      <div className='List_wrap'>
        {shape === 'AlbumTracks' ? (
          <>
            {/* 앨범 트랙리스트 */}
            <div className='List_trackNum'>{data.track_number}</div>
            <div className='List_album_wrap'>
              <div className='List_albumName text_overflow'>
                <TextFlow text={data.name} />
              </div>

              <div className='List_albumArtist text_overflow attachName'>
                <TextFlow text={data.artists} />
              </div>
            </div>
          </>
        ) : (
          <>
            {/* 플레이리스트 or 찜한 목록 */}
            <div className='List_albumImg'>
              <img
                src='https://cdnimg.melon.co.kr/resource/image/cds/musicstory/imgUrl20240226033008100.jpg'
                alt='img'
              />
            </div>
            <div className='List_album_wrap List_album_wrap_paddingLeft '>
              <div className='List_albumName text_overflow'>
                <TextFlow text={'곡 제목'} />
              </div>
              <div className='List_albumArtist text_overflow attachName'>
                <TextFlow text={'가수이름'} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default List;
