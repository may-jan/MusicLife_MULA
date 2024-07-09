import React from 'react';
import Header from '../components/Header';
import SearchTab from '../components/SearchTab';
import Result from '../components/Result';
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
