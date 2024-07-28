import axios from 'axios';

const GetLikeTracks = async () => {
  const token = sessionStorage.getItem('token');

  try {
    const res = await axios.get(`https://api.spotify.com/v1/me/tracks`, {
      headers: { Authorization: `Bearer ${token}` },
      // 페이지 설정 수정 예정
      params: { limit: 50, offset: 0 },
    });
    const data = res.data;
    return {
      tracks: data.items,
      total: data.total,
    };
  } catch (e) {
    console.log('getLikeTracks fn 오류', e);
    return null;
  }
};

export default GetLikeTracks;
