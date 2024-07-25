import React, { useContext, useState } from 'react';
import axios from 'axios';
import { IoSearch } from 'react-icons/io5';
import { MusicContext } from '../context/Context';
import '../styles/SearchTab.css';
import resultAlert from '../utils/resultAlert';

const SearchTab = () => {
  const musicContext = useContext(MusicContext);
  const token = sessionStorage.getItem('token');
  const [searchKey, setSearchKey] = useState(musicContext.searchKey);

  const searchArtists = async (e) => {
    e.preventDefault();

    if (searchKey.replace(/(\s*)/g, '') === '') {
      resultAlert('검색어를 다시 입력하세요', 'warning');
      setSearchKey('');
      return;
    } else {
      setSearchKey(searchKey.replace(/(\s*)/g, ''));
    }

    await axios
      .get(`https://api.spotify.com/v1/search`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: searchKey.replace(/(\s*)/g, ''),
          type: 'artist',
        },
      })
      .then((res) => {
        musicContext.update_searchResults(res.data.artists.items);
        musicContext.update_searchKey(searchKey);
      })
      .catch((e) => {
        console.log('SearchTab 에러');
      });
  };

  return token ? (
    <div className='SearchTab'>
      <form onSubmit={searchArtists}>
        <input
          type='text'
          onChange={(e) => setSearchKey(e.target.value)}
          placeholder={'Search for Artist'}
          value={searchKey}
        />
        <button type={'submit'}>
          <IoSearch className='icon_searchTab' />
        </button>
      </form>
    </div>
  ) : (
    ''
  );
};

export default SearchTab;
