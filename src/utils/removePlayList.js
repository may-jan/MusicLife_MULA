import axios from "axios";
import askAlert from "./askAlert";
import resultAlert from "./resultAlert";

const RemovePlayList = async ({ playListID, albumUri, plSnapshotID }) => {
  const token = sessionStorage.getItem("token");
  const result = askAlert("플레이리스트에서 삭제하시겠습니까?");

  if (await result) {
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
            // snapshot_id: plSnapshotID,
          },
        }
      );
      // 성공적으로 삭제된 경우 PlayListDetail로 true 반환
      resultAlert("삭제되었습니다", "success");
      return true;
    } catch (e) {
      // 삭제 실패한 경우
      resultAlert("삭제에 실패하였습니다", "error");
      console.log("removePlayList 오류", e);
      return false;
    }
  } else {
    // 사용자가 취소한 경우
    resultAlert("취소되었습니다", "error");
    return false;
  }
};

export default RemovePlayList;
