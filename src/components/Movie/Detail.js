/* eslint-disable react-hooks/exhaustive-deps */
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Header, Loader } from "../../Common/Component";
import _ from "lodash";

const Detail = () => {
  const location = new useLocation();
  const [movieDetail, setMovieDetail] = useState();
  const [movieCredit, setMovieCredit] = useState();
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigate = new useNavigate();

  const getMovieDetail = async () => {
    const url = `https://api.themoviedb.org/3/movie/${location?.state?.id}?api_key=5567a607e97634a52b7ffdc87eae7dc3&language=en-US`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson) {
      setMovieDetail(responseJson);
    }
  };

  const getMovieCredit = async () => {
    const url = `https://api.themoviedb.org/3/movie/${location?.state?.id}/credits?api_key=5567a607e97634a52b7ffdc87eae7dc3&language=en-US`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson) {
      setMovieCredit(responseJson?.cast);
    }
  };

  useEffect(() => {
    getMovieDetail();
    getMovieCredit();
  }, [location]);

  const getMovieRequest = async (movie_id) => {
    const url = `https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=5567a607e97634a52b7ffdc87eae7dc3&language=en-US&page=1`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson?.results) {
      setMovies(responseJson?.results);
    }
  };

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favorites, movie];
    setFavorites(newFavouriteList);
  };

  useEffect(() => {
    if (movieDetail) {
      getMovieRequest(movieDetail?.id);
    }
  }, [movieDetail]);

  const navigateDetail = (data) => {
    navigate(`/detail/${data?.original_title}`, { state: data });
  };

  return (
    <div>
      <Loader />
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-2 col-md-4">
            <img
              src={"https://image.tmdb.org/t/p/w500" + movieDetail?.poster_path}
              alt="movie"
              className="img-fluid w-100 h-100 py-2"
            />
          </div>
          <div className="col py-2">
            <h3>{movieDetail?.original_title}</h3>
            <h6>Genre : {_.join(_.map(movieDetail?.genres, "name"), ", ")}</h6>
            <br />
            <div className="col-6">
              <div>
                <strong>Actors :</strong>
              </div>
              {_.join(_.map(movieCredit, "name"), ", ")}
            </div>
            <p>
              <div>
                <strong>Story :</strong>
              </div>
              {movieDetail?.overview}
            </p>
          </div>
        </div>
        <div className="row">
          {movies.map((movie, index) => (
            <>
              <div className="col-sm-4 col-lg-2 py-2" key={index}>
                <div
                  className="card image-container"
                  onClick={() => navigateDetail(movie)}
                >
                  <img
                    src={"https://image.tmdb.org/t/p/w500" + movie?.poster_path}
                    alt="movie"
                    className="card-img-top w-100 h-100"
                  />
                  <div className="card-img-overlay overlay">
                    <div
                      className="card-text overlay-text"
                      onClick={() => {
                        addFavouriteMovie(movie);
                      }}
                    >
                      Add to Favorites
                    </div>
                  </div>
                  <div className="card-body">
                    <h6 className="card-title">{movie?.original_title}</h6>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Detail;
