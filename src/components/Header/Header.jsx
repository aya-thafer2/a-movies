import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import "swiper/swiper.css";
import style from "./Header.module.css";
import { useNavigate } from "react-router-dom";

const Header = ({loading,setLoading, apiKey, imgPath }) => {
  const navigate = useNavigate();
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [shows, setShows] = useState([]);
  let movies = [];

  const getPopularMovies = async () => {
    const result = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
    );
    movies = result.data.results.slice(0, 4);
    setPopularMovies(result.data.results.slice(0, 4));
    setShows(result.data.results.slice(0,4));
  };
  const getPopularTV = async () => {
    const result = await axios.get(
      `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`
    );
    setPopularTV(result.data.results.slice(0,4));
    setShows([...shows,result.data.results.slice(0,4)]);
  };

  useEffect(() => {
    getPopularMovies();
  }, []);

  return (
    <Swiper
      modules={[Autoplay]}
      grabCursor={true}
      spaceBetween={0}
      slidesPerView={1}
      autoplay={{ delay: 3000 }}
    >
      {popularMovies.map((movie) => (
        <SwiperSlide key={movie.id}>
          <div
            className={`${style.slide}`}
            style={{
              backgroundImage: `url(${imgPath + movie.backdrop_path})`,
            }}
          >
            <div className="container">
              <div
                className={`${style.slideContent} row justify-content-between`}
              >
                <div className="col-8">
                  <div className={`${style.slideInfo}`}>
                    <h2 className={`${style.title}`}>{movie.title}</h2>
                    <div className="fw-bold fs-3">
                        <i className="fa-solid fa-star text-warning"></i>{" "}
                        {movie.vote_average}
                      </div>
                    <div className={`${style.overview}`}>{movie.overview}</div>
                    <button className={`${style.button} py-2 px-3 rounded-5 text-white`} onClick={() => navigate(`/movie/${movie.id}`)}>
                      <p className="fs-5 fw-bold">More Details</p>
                    </button>
                  </div>
                </div>
                <div className="col-4">
                  <div className={`${style.slidePoster}`}>
                    <img
                      src={imgPath + movie.poster_path}
                      className="rounded-4"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Header;
