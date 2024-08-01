import axios from 'axios';

const GetPlayLists = async () => {
  const token = sessionStorage.getItem('token');

  try {
    const res = await axios.get(`https://api.spotify.com/v1/me/playlists`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = res.data;
    return data.items;
  } catch (e) {
    console.log('getPlayLists fn 오류');
    return null;
  }
};

export default GetPlayLists;
