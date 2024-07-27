import axios from 'axios';
import askAlert from './askAlert';
import resultAlert from './resultAlert';

const AddPlayList = async (musicInfo, playListID, onClose) => {
  const token = sessionStorage.getItem('token');
  const result = askAlert('플레이리스트에 추가하시겠습니까?');

  if (await result) {
    const res = await axios
      .post(
        `https://api.spotify.com/v1/playlists/${playListID}/tracks`,
        {
          uris: [musicInfo.uri],
          position: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        resultAlert('추가되었습니다', 'success');
      })
      .catch((e) => {
        resultAlert('추가에 실패하였습니다', 'error');
        console.log('addPlayList 오류', e);
      });
  } else {
    resultAlert('취소되었습니다', 'error');
  }
  onClose();
};

export default AddPlayList;
