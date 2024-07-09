import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MusicContext } from './context/Context';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Artist from './pages/Artist';
import Album from './pages/Album';
import Music from './pages/Music';
import Swal from 'sweetalert2';

function App() {
  const [searchResults, setSearchResults] = useState({});
  const artistInfo = {};
  const [searchKey, setSearchKey] = useState('');

  const update_searchResults = async (data) => {
    setSearchResults(data);
  };

  const update_searchKey = async (data) => {
    setSearchKey(data);
  };

  const token = sessionStorage.getItem('token');
  const one_hour = 1000 * 60 * 60;

  useEffect(() => {
    if (token !== null) {
      setTimeout(() => {
        window.sessionStorage.clear();
        window.localStorage.clear();
        Swal.fire({
          html: '1시간이 경과하여 로그아웃 되었습니다<br/>다시 로그인 해주세요',
          icon: 'warning',
        }).then((res) => {
          if (res.isConfirmed) {
            window.location.replace('/');
          }
        });
      }, one_hour);
    }
  }, [token]);

  return (
    <div className='App'>
      <MusicContext.Provider
        value={{
          searchResults,
          update_searchResults,
          artistInfo,
          searchKey,
          update_searchKey,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/artist/:id' element={<Artist />} />
            <Route path='/album/:id' element={<Album />} />
            <Route path='/music/:id' element={<Music />} />
          </Routes>
        </BrowserRouter>
      </MusicContext.Provider>
    </div>
  );
}
export default App;
