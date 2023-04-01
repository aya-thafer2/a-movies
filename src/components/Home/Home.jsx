import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header'
import TopRatedMovies from '../TopRatedMovies/TopRatedMovies';
import TopRatedTV from '../TopRatedTV/TopRatedTV';
import TrendingSwiper from '../TrendingSwiper/TrendingSwiper'
import TrendingTVShows from '../TrendingTVShows/TrendingTVShows';

const Home = ({loading,setLoading,apiKey,imgPath}) => {
 
  return (
    <>
    <Header loading={loading} setLoading={setLoading} apiKey={apiKey} imgPath={imgPath} />
    <div className="container">
    <TrendingSwiper loading={loading} setLoading={setLoading} apiKey={apiKey} imgPath={imgPath}/>
    <TopRatedMovies loading={loading} setLoading={setLoading} apiKey={apiKey} imgPath={imgPath}/>
    <TrendingTVShows loading={loading} setLoading={setLoading} apiKey={apiKey} imgPath={imgPath}/>
    <TopRatedTV loading={loading} setLoading={setLoading} apiKey={apiKey} imgPath={imgPath}/>
    </div>
    </>
  )
}

export default Home