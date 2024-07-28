import axios from 'axios';
import askAlert from './askAlert';
import resultAlert from './resultAlert';

const AddLikeTrack = async (id) => {
  const token = sessionStorage.getItem('token');
  const result = askAlert('찜한 목록에 추가하시겠습니까?');

  if (await result) {
    try {
      const res = await axios.put(
        `https://api.spotify.com/v1/me/tracks`,
        { ids: [id] },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      resultAlert('추가되었습니다', 'success');
      return true;
    } catch {
      resultAlert('추가에 실패하였습니다', 'error');
      console.log('addLikeTrack fn 오류');
      return false;
    }
  } else {
    resultAlert('취소되었습니다', 'error');
    return false;
  }
};

export default AddLikeTrack;
