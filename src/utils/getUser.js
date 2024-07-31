import axios from 'axios';
import { useState, useEffect } from 'react';

const GetUser = () => {
  const token = sessionStorage.getItem('token');
  const [userInfo, setUserInfo] = useState();

  const getUserInfo = async () => {
    await axios
      .get(`https://api.spotify.com/v1/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = res.data;
        setUserInfo({
          userName: data.display_name,
          userImg: data.images[1].url,
          userID: data.id,
        });
      })
      .catch((e) => {
        console.log('getUser fn 오류');
      });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return userInfo;
};

export default GetUser;
