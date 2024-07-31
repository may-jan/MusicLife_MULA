import axios from 'axios';
import resultAlert from './resultAlert';
import askAlert from './askAlert';
import Swal from 'sweetalert2';

const CreatePlayList = async (userID) => {
  const token = sessionStorage.getItem('token');
  const result = askAlert('플레이리스트를 생성하시겠습니까?');

  if (await result) {
    Swal.fire({
      text: '플레이리스트 이름을 입력해주세요',
      input: 'text',
      confirmButtonText: '생성하기',
    }).then((res) =>
      axios
        .post(
          `https://api.spotify.com/v1/users/${userID}/playlists`,
          {
            name: res.value,
            public: true,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          resultAlert('플레이리스트가 생성되었습니다', 'success');
        })
        .catch((e) => {
          resultAlert('플레이리스트 생성에 실패하였습니다', 'error');
          console.log('addPlayList 오류', e);
        })
    );
  }
};

export default CreatePlayList;
