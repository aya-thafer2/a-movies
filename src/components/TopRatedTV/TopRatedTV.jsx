import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Slider from '../common/Slider/Slider';

const TopRatedTV = ({loading,setLoading,apiKey,imgPath}) => {
    const [shows, setShows] = useState([]);

    const getShows = async () => {
      const result = await axios.get(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}`
      );
      
      setShows(result.data.results);
    };
    useEffect(() => {
        getShows();
    }, []);

  return (
    <Slider title={'Top Rated TV Shows'} shows={shows} apiKey={apiKey} imgPath={imgPath}loading={loading} setLoading={setLoading} type={'tv'}/>
  )
}

export default TopRatedTV