import React, { useState, useEffect } from "react";
import axios from "./axiosHelper";
import request from "./request";
import "./Banner.css";

const img_base_url = "https://image.tmdb.org/t/p/original";

function Banner(props) {
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const req = await axios.get(request.fetchNetflixOriginals);
      setMovie(
        req.data.results[
          Math.floor(Math.random() * req.data.results.length - 1)
        ]
      );
    }
    fetchData();
  }, []);
  //console.log(movie);
  //function to limit the number of characters to be shown on banner and then we want to show trailling three dots i.e ...
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("${img_base_url}${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner-title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner_buttons">
          <button
            className="banner_button"
            style={{ marginRight: "15px", marginTop: "8px" }}
          >
            Play
          </button>
          <button className="banner_button">My List</button>
        </div>
        <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="banner_fadeBottom" style={{ marginTop: "105px" }} />
    </header>
  );
}

export default Banner;
