/* eslint-disable react-hooks/exhaustive-deps */
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Header, Loader } from "../../Common/Component";

const Detail = () => {
  const location = new useLocation();
  const [movieDetail, setMovieDetail] = useState();
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigate = new useNavigate();

  const getMovieDetail = async () => {
    const url = `http://www.omdbapi.com/?i=${location?.state?.imdbID}&apikey=b5e0c74e&plot=full`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson) {
      setMovieDetail(responseJson);
    }
  };

  useEffect(() => {
    getMovieDetail();
  }, [location]);

  //   {
  //     "Title": "Marvel One-Shot: Agent Carter",
  //     "Year": "2013",
  //     "Rated": "Not Rated",
  //     "Released": "24 Sep 2013",
  //     "Runtime": "15 min",
  //     "Genre": "Short, Action, Adventure, Sci-Fi",
  //     "Director": "Louis D'Esposito",
  //     "Writer": "Eric Pearson (screenplay), Jack Kirby (characters), Stan Lee (characters)",
  //     "Actors": "Hayley Atwell, Bradley Whitford, Dominic Cooper, Tim Trobec",
  //     "Plot": "Frustrated at being marginalized at work, Peggy Carter goes on an unauthorized solo field mission.",
  //     "Language": "N/A",
  //     "Country": "USA",
  //     "Awards": "1 win.",
  //     "Poster": "https://m.media-amazon.com/images/M/MV5BZDIwZTM4M2QtMWFhYy00N2VmLWFlMjItMzI3NjBjYTc0OTMxXkEyXkFqcGdeQXVyNTE1NjY5Mg@@._V1_SX300.jpg",
  //     "Ratings": [
  //         {
  //             "Source": "Internet Movie Database",
  //             "Value": "7.6/10"
  //         }
  //     ],
  //     "Metascore": "N/A",
  //     "imdbRating": "7.6",
  //     "imdbVotes": "8,222",
  //     "imdbID": "tt3067038",
  //     "Type": "movie",
  //     "DVD": "N/A",
  //     "BoxOffice": "N/A",
  //     "Production": "N/A",
  //     "Website": "N/A",
  //     "Response": "True"
  // }
  const getMovieRequest = async (query) => {
    const url = `http://www.omdbapi.com/?s=${query}&apikey=b5e0c74e`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favorites, movie];
    setFavorites(newFavouriteList);
  };

  useEffect(() => {
    if (movieDetail) {
      getMovieRequest(movieDetail?.Title);
    }
  }, [movieDetail]);

  const navigateDetail = (data) => {
    navigate(`/detail/${data?.imdbID}`, { state: data });
  };

  return (
    <div>
      <Loader />
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-2 col-md-4">
            <img
              src={movieDetail?.Poster}
              alt="movie"
              className="img-fluid w-100 h-100 py-2"
            />
          </div>
          <div className="col py-2">
            <h3>{movieDetail?.Title}</h3>
            <h6>Genre : {movieDetail?.Genre}</h6>
            <br />
            <div className="col-6">
              <div>
                <strong>Actors :</strong>
              </div>
              {movieDetail?.Actors}
            </div>
            <p>
              <div>
                <strong>Story :</strong>
              </div>
              {movieDetail?.Plot}
            </p>
          </div>
        </div>
        <div className="row">
          {movies.map((movie, index) => (
            <>
              <div className="col-sm-4 col-lg-2 py-2" key={index}>
                <div
                  class="card image-container"
                  onClick={() => navigateDetail(movie)}
                >
                  <img
                    src={movie.Poster}
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
                  <div class="card-body">
                    <h6 class="card-title">{movie.Title}</h6>
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
