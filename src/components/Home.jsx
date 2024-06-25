import React from 'react';
import Header from './Header';
import SearchTab from './SearchTab';
import Result from './Result';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className='Home'>
      <Header />
      <SearchTab />
      <Result />
    </div>
  );
};

export default Home;
