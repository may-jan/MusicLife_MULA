import axios from 'axios';

const GetPlayListInfo = async (id) => {
  const token = sessionStorage.getItem('token');

  try {
    const res = await axios.get(`https://api.spotify.com/v1/playlists/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = res.data;
    return {
      plName: data.name,
      plTotal: data.tracks.total,
      plTracks: data.tracks.items,
      plSnapshotID: data.snapshot_id,
    };
  } catch (e) {
    console.log('getPlayListInfo fn 오류', e);
    return null;
  }
};

export default GetPlayListInfo;
