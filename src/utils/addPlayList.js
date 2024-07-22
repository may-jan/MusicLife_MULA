import axios from 'axios';

const AddPlayList = (musicInfo, playListID, onClose) => {
  const token = sessionStorage.getItem('token');
  const add = window.confirm('추가하시겠습니까?');

  if (add) {
    const addPlayList = async () => {
      await axios
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
          alert('추가되었습니다');
        })
        .catch((e) => {
          alert('추가에 실패하였습니다');
          console.log('addPlayList 오류', e);
        });
    };
    addPlayList();
  } else {
    alert('취소되었습니다');
  }
  onClose();
};

export default AddPlayList;
