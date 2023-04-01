import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import Genres from "../Genres/Genres";
import style from "./Popular.module.css";
import pagination from "../../utils/pagination";
import Loader from "../Loader/Loader";


const Popular = ({loading,setLoading, apiKey, imgPath }) => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}`;
  const [pageTitle, setPageTitle] = useState("popular movies");
  const [popularMovies, setPopularMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    pageNumber: 0,
    pageSize: 12,
  });
  const getPopularMovies = async () => {
    const result = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
    );
    setPopularMovies(result.data.results);
    setShows(result.data.results);
    setLoading(false);
    //console.log(shows);
  };
  const getTrending = async () => {
    const result = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`
    );
    
    setShows(result.data.results);
    setLoading(false);
  };

  const searchMovie = async (e) => {
    const { value } = e.target;
    const result = await axios.get(searchURL + "&query=" + value);
    setShows(result.data.results);
    setLoading(false);
    console.log(shows);
    setPageTitle(`Search results for "${value}"`);
    
    setPageInfo({ ...pageInfo, pageNumber: 0 });
    if (value === "") {
      setPageTitle("popular movies");
      setShows(popularMovies);
    }
    
  };

  const getGenres = async () => {
    const result = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
    );
    setGenres(result.data.genres);
    setLoading(false);
  };
  const genreUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=`;

  
  const changePageNumber = (page) => {
    setPageInfo({ ...pageInfo, pageNumber: page });
  };
  useEffect(() => {
    setLoading(true);
    getPopularMovies();
    getGenres();
    getTrending();
  }, []);

  return (
    <>
    {loading?
      (<Loader/>):
      (<div className="container py-4 popular">
      <div className="row align-items-center my-4">
        <div className="col-6">
          <h2 className="text-capitalize fw-bold">{pageTitle}</h2>
        </div>
        <div className="col-6">
          <div className={`d-flex align-items-center ${style.searchCont}`}>
            <input
              className="form-control w-75 ms-auto"
              type="search"
              placeholder="Search Movies . . ."
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
              <div className={`${style.show} col-lg-3 col-md-6 py-3`} onClick={() => navigate(`/movie/${show.id}`)} key={index}>
                <div
                  className={`card bg-dark text-light`}
                  style={{ width: "18rem", height: "18rem" }}
                >
                  {show.backdrop_path !== null ? (
                    <>
                      <img
                        src={imgPath + show.backdrop_path}
                        className="card-img-top"
                        alt={show.title}
                      />
                    </>
                  ) : (
                    <>
                      <img
                        src="/assets/no-poster - Copy.png"
                        className="card-img-top"
                        height="57%"
                        alt={show.title}
                      />
                    </>
                  )}

                  <div className="card-body">
                    <h5 className="card-title" style={{ height: "3rem" }}>
                      {show.title}
                    </h5>
                    <div className="details d-flex justify-content-between align-items-center">
                      <span className="fw-bold">
                        <i className="fa-solid fa-star text-warning"></i>{" "}
                        {show.vote_average}
                      </span>
                      <button
                        className={`btn btn-outline-light btn-rounded text-capitalize`}
                        onClick={() => navigate(`/movie/${show.id}`)}
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
    </div>)
    }
    
    </>
  );
};

export default Popular;
