import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import "swiper/swiper.css";
import style from './Slider.module.css'

const Slider = ({title,shows,apiKey,imgPath,loading,setLoading,type}) => {
    const navigate = useNavigate();
  return (
    <>
    
    <div className="row justify-content-between align-items-center">
     <div className="col-6">
     <h4 className="my-5 fw-bold ">{title}</h4>
     </div>
    <div className="col-6 text-end">
    <button className={`${style.button} py-2 px-3 mx-1 m-1 rounded-5 text-white fw-bold`} onClick={() => navigate(`/${type}`)}>
        View More
    </button>
    </div>

    </div>
     <Swiper
     modules={[Autoplay]}
    grabCursor={true}
    spaceBetween={10}
    slidesPerView={8}
    autoplay={{delay:3000}}
  >
    {shows.map((show) => (
      <SwiperSlide key={show.id} className={`${style.slide}`}>
        
            <div className={` position-relative`} onClick={() => navigate(`/${type}/${show.id}`)}>
                  <img
                    src={imgPath + show.poster_path}
                    className="rounded-4"
                    alt=""
                  />
            </div>
            <p className="text-center fw-bolder">{show.title || show.name}</p>
      </SwiperSlide>
    ))}
  </Swiper>
    </>
  )
}

export default Slider