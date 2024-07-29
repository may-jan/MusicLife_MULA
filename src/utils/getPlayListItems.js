import axios from 'axios';

const GetPlayListItems = async (id) => {
  const token = sessionStorage.getItem('token');

  try {
    const res = await axios.get(
      `https://api.spotify.com/v1/playlists/${id}/tracks`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        // 페이지 설정 수정 예정
        params: { limit: 50, offset: 0 },
      }
    );
    const data = res.data;
    return data.items;
  } catch (e) {
    console.log('getPlayListItems fn 오류');
    return null;
  }
};

export default GetPlayListItems;
