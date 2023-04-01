import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import "swiper/swiper.css";
import style from "./TrendingSwiper.module.css";
import Slider from "../common/Slider/Slider";

const TrendingSwiper = ({loading,setLoading,apiKey,imgPath}) => {
    const [shows, setShows] = useState([]);
  
  
    const getTrending = async () => {
      const result = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`
      );
      
      setShows(result.data.results);
    };
    useEffect(() => {
        getTrending();
    }, []);

  return (
    <>
    <Slider title={'Trending Movies'} shows={shows} apiKey={apiKey} imgPath={imgPath} loading={loading} setLoading={setLoading} type={'movies'}/>
    </>
    
   
    
  )
}

export default TrendingSwiper