import React, { useEffect, useState } from "react";
import "./Row.css";
import YouTube from "react-youtube";
import instance from "./axiosHelper";
import movieTrailer from "movie-trailer";

//or
// import axios from "./axiosHelper";
const img_base_url = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await instance.get(fetchUrl);
      // console.log(request);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]); //note if inside the useEffect if we use any outside variable(here like itle or fetchUrl,outside the scope of useEffect)
  // is used or pulled in then we have to must pass that variable in the array present in 2nd argument of useEffect
  //becoz now useEffect is dependent on that variable so everytime that variavble changes we have to render this component again

  // console.table(movies); //use for arrays and tables------------------------note

  const opts = {
    height: "400",
    width: "100%",
    playerVars: {
      //https://developers.google.com/youtube/player_parameters
      autoplay: 1, //means start playing the video as soon as pop up loads
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
        .then((url) => {
          //https://www.youtube.com/watch?v=XtMThy8Qkql and we only need this XtMThy8Qkql as trailerUrl
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => {
          //here movies.poster_path returns "/pTEFqAjLd5YTsMD6NSUxV6Dq7A6"which is not a valid url for img tag
          //the base url of all such images in TMDB is
          return (
            <img
              key={movie.id}
              onClick={() => handleClick(movie)}
              className={`row_poster ${isLargeRow && "row_posterLarge"}`}
              src={`${img_base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
            />
          );
        })}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
