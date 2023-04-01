import axios from "axios";
import { filter, indexOf } from "lodash";
import React, { useEffect, useState } from "react";
import style from "./Genres.module.css";

const Genres = ({
  apiKey,
  genres,
  setGenres,
  selectedGenre,
  setSelectedGenre,
  shows,
  setShows,
  genreUrl,
}) => {
  const genresIds = (selectedGenre) => {
    if (selectedGenre.length < 1) {
      return "";
    }
    const genresId = selectedGenre?.map((genre) => genre?.id);
    return genresId?.reduce((acc, curr) => acc + "," + curr);
  };

  
  const select = (e, genre) => {
    clicked(e);

    if (selectedGenre.includes(genre)) {
      for (let i = 0; i < selectedGenre.length; i++) {
        if (selectedGenre[i] === genre) {
          let x = selectedGenre.splice(i, 1);
          setSelectedGenre(selectedGenre);
        }
      }
    } else {
      setSelectedGenre([...selectedGenre, genre]);
    }

    getFilteredShows();
  };

  const clicked = (e) => {
    e.target.classList.toggle(`${style.clicked}`);
  };
  const getFilteredShows = async () => {
    const genresIDs = genresIds(selectedGenre);
    const result = await axios.get(genreUrl + genresIDs);
    
    setShows(result.data.results);
  };
  useEffect(() => {
    getFilteredShows();
  }, [selectedGenre]);

  return (
    <div
      className={`row justify-content-center align-items-center  ms-auto mt-4 collapse genres`}
      id="collapseExample"
    >
      {genres.map((genre) => (
        <button
          className={`${style.genre} py-1 px-3 mx-1 m-1 rounded-5 text-white`}
          id={genre.id}
          key={genre.id}
          onClick={(e) => {
            select(e, genre);
          }}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};

export default Genres;
