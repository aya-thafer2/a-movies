import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from "../Pagination/Pagination";
import pagination from '../../utils/pagination';
import Genres from '../Genres/Genres';
import style from './PopularTV.module.css'
import Loader from '../Loader/Loader';

const PopularTV = ({loading,setLoading, apiKey, imgPath }) => {
    const navigate = useNavigate();
  const ref = useRef(null);
  const searchURL = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}`;
  const [pageTitle, setPageTitle] = useState("popular TV shows");
  const [popularTV, setPopularTV] = useState([]);
  const [shows, setShows] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    pageNumber: 0,
    pageSize: 12,
  });

  const getPopularTV = async () => {
    const result = await axios.get(
      `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`
    );
    setPopularTV(result.data.results);
    setShows(result.data.results);
    console.log(shows);
    setLoading(false);
  };

  const searchMovie = async (e) => {
    const { value } = e.target;
    const result = await axios.get(searchURL + "&query=" + value);
    setShows(result.data.results);
    console.log(shows);
    setPageTitle(`Search results for "${value}"`);
    
    setPageInfo({ ...pageInfo, pageNumber: 0 });
    if (value === "") {
      setPageTitle("popular TV shows");
      setShows(popularTV);
    }
  };

  
  const getGenres = async () => {
    const result = await axios.get(
      `https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}`
    );
    setGenres(result.data.genres);
    setLoading(false);
  };
  const genreUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=`;

  
  
  const changePageNumber = (page) => {
    setPageInfo({ ...pageInfo, pageNumber: page });
  };

  useEffect(() => {
    setLoading(true);
    getPopularTV();
    getGenres();
  }, []);

  return (
    <>
    {loading?(<Loader/>):(<div className="container py-4 popular">
      <div className="row align-items-center my-4">
        <div className="col-6">
          <h3 className="text-capitalize fw-bold">{pageTitle}</h3>
        </div>
        <div className="col-6">
          <div className={`d-flex align-items-center ${style.searchCont}`}>
            <input
              className="form-control w-75 ms-auto"
              type="search"
              placeholder="Search TV Shows . . ."
              aria-label="Search"
              onChange={searchMovie}
            />
            <Link
              className="bg-transparent border-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseExample"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              <i className="fa-solid fa-filter fa-beat ms-2 fs-4"></i>
            </Link>
          </div>
        </div>
        <Genres
          apiKey={apiKey}
          genres={genres}
          setGenres={setGenres}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          shows={shows}
          setShows={setShows}
          genreUrl={genreUrl}
        />
      </div>

      <div className="row">
        {shows.length === 0 ? (
          <>
            <p className={`fs-1 text-center d-flex align-items-center justify-content-center fw-bold`} style={{height:'40vh'}}>No Results Found</p>
          </>
        ) : (
          <>
            {pagination(shows, pageInfo.pageNumber, pageInfo.pageSize).map((show, index) => (
              <div className={`${style.show} col-lg-3 col-md-6 py-3`} onClick={() => navigate(`/tv/${show.id}`)} key={index}>
                <div
                  className="card bg-dark text-light"
                  style={{ width: "18rem", height: "18rem" }}
                >
                  {show.backdrop_path !== null ? (
                    <>
                      <img
                        src={imgPath + show.backdrop_path}
                        className="card-img-top"
                        alt={show.name}
                      />
                    </>
                  ) : (
                    <>
                      <img
                        src="/assets/no-poster - Copy.png"
                        className="card-img-top"
                        height="57%"
                        alt={show.name}
                      />
                    </>
                  )}

                  <div className="card-body">
                    <h5 className="card-title" style={{ height: "3rem" }}>
                      {show.name}
                    </h5>
                    <div className="details d-flex justify-content-between align-items-center">
                      <span className="fw-bold">
                        <i className="fa-solid fa-star text-warning"></i>{" "}
                        {show.vote_average}
                      </span>
                      <button
                        className={`btn btn-outline-light btn-rounded text-capitalize`}
                        onClick={() => navigate(`/tv/${show.id}`)}
                      >
                        More Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <Pagination
      shows={shows}
        changePageNumber={changePageNumber}
        {...pageInfo}
      />
    </div>)}
    </>
  )
}

export default PopularTV