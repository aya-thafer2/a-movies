import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import Loader from '../Loader/Loader';
import style from './TVdetails.module.css'

const TVdetails = ({loading,setLoading, apiKey, imgPath }) => {
    const { id } = useParams();
    const [tvDetails, setTVDetails] = useState({});
    const [tvGenres, setTVGenres] = useState([]);
    const [tvVideos, setTVVideos] = useState([]);
    const [tvTrailer, setTVTrailer] = useState([]);
    const [trailerId, setTrailerId] = useState("");
    const [cast, setCast] = useState([]);

    const getTVDetails = async () => {
        const details = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}`
        );
        console.log(details.data);
        setTVDetails(details.data);
        setTVGenres(details.data.genres);
    
        const videos = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${apiKey}`
        );
        setTVVideos(videos.data.results);
        tvVideos.map((video) => {
          if (video.name === "Official Trailer") {
            setTVTrailer(video?.name);
            setTrailerId(video?.key);
          }
        });
      };

      const getTVCredits = async () => {
        const result = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${apiKey}`
        );
        console.log(result.data.cast);
        setCast(result.data.cast.slice(0, 5));
        console.log(cast);
      };
      const opts = {
        height: "500",
        width: "100%",
        playerVars: {
          origin: window.location.origin,
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };
      function _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
      }
      useEffect(() => {
        getTVDetails();
        getTVCredits();
      }, []);
    

  return (
    <>
    {loading?<><Loader/></>:<>
    <div className="container py-5">
      <div className="row py-4">
        <div className="col-md-5 d-flex justify-content-end">
          <img
            src={imgPath + tvDetails.poster_path}
            className="rounded-4"
            alt=""
            
            width={'90%'}
          />
        </div>
        <div className="col-md-7">
          <div className="row justify-content-between">
          <h2 className={`fw-bold ${style.title}`}>{tvDetails.name}</h2>
          {/* <p className={`${style.heart} pe-5`}><i className={`fa-solid fa-heart fs-2`}></i></p> */}
          </div>
          <div className="row w-75">
            {tvGenres.map((genre) => (
              <div className="col-md-6 col-lg" key={genre.id}>
                <div
                  className={`${style.genre}p-1 border rounded-5 text-center m-1`}
                >
                  {genre.name}
                </div>
              </div>
            ))}
          </div>
          <div className="fw-bold fs-5 py-2">
            <i className="fa-solid fa-star text-warning"></i>{" "}
            {tvDetails.vote_average}
          </div>
          <p className="py-4">{tvDetails.overview}</p>
          <p className={`${style.releaseDate}`}>
            <i className="fa-regular fa-calendar-days text-danger"></i> Release
            Date: {tvDetails.first_air_date}
          </p>
          <div className="cast py-1 ">
            <h3 className="text-capitalize py-2 mb-3 fs-2 fw-bold ms-4">cast</h3>
            <div className="row">
              {cast.map((person) => {
                return (
                  <div
                    className={`${style.person} text-center`}
                    key={person.id}
                  >
                    {person.profile_path ? (
                      <>
                        <img
                          src={imgPath + person.profile_path}
                          className="rounded-5 pb-2"
                          alt=""
                          width={"80px"}
                        />
                      </>
                    ) : (
                      <>
                        <img
                          src={"/assets/avatar.jpg"}
                          className="rounded-5 pb-2"
                          alt=""
                          width={"80px"}
                          height={"150px"}
                        />
                      </>
                    )}
                    <p>{person.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="col-12 py-5">
          <h3 className="text-capitalize py-2 mb-5">Official Trailer</h3>

          <YouTube videoId={trailerId} loading='eager' opts={opts} onReady={_onReady}/>
          {/* <iframe src={`//www.youtube.com/embed/${trailerId}`} loading='lazy' title='trailer' width='100%' height='500px' frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe> */}
        </div>
      </div>
    </div>
    </>}
    </>
  )
}

export default TVdetails