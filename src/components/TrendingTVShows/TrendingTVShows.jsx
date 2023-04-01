import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from '../common/Slider/Slider';

const TrendingTVShows = ({loading,setLoading,apiKey,imgPath}) => {
    const [shows, setShows] = useState([]);
    const getTrending = async () => {
      const result = await axios.get(
        `https://api.themoviedb.org/3/trending/tv/day?api_key=${apiKey}`
      );
      
      setShows(result.data.results);
      
    };
    useEffect(() => {
        getTrending();
    }, []);

  return (
    <>
    <Slider title={'Trending TV Shows'} shows={shows} apiKey={apiKey} imgPath={imgPath} loading={loading} setLoading={setLoading} type={'tv'}/>
    </>
    
   
    
  )
}

export default TrendingTVShows