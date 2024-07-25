import axios from 'axios';

const RemovePlayList = async ({ playListID, albumUri, plSnapshotID }) => {
  const token = sessionStorage.getItem('token');
  const remove = window.confirm('삭제하시겠습니까?');

  if (remove) {
    try {
      const res = await axios.delete(
        `https://api.spotify.com/v1/playlists/${playListID}/tracks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            tracks: [
              {
                uri: albumUri,
              },
            ],
            snapshot_id: plSnapshotID,
          },
        }
      );

      // 성공적으로 삭제된 경우 PlayListDetail로 true 반환
      alert('삭제되었습니다');
      return true;
    } catch (e) {
      // 삭제 실패한 경우
      alert('삭제에 실패하였습니다');
      console.log('removePlayList 오류', e);
      return false;
    }
  } else {
    // 사용자가 취소한 경우
    alert('취소되었습니다');
    return false;
  }
};

export default RemovePlayList;
