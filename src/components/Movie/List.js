import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Header, Loader } from "../../Common/Component";
import { useNavigate } from "react-router-dom";
import "./Common.css";

const List = () => {
  const navigate = new useNavigate();
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("Marvel");
  const [favorites, setFavorites] = useState([]);

  const getMovieRequest = async () => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=5567a607e97634a52b7ffdc87eae7dc3`;

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
    getMovieRequest(searchValue);
  }, [searchValue]);

  const navigateDetail = (data) => {
    navigate(`/detail/${data?.original_title}`, { state: data });
  };

  return (
    <div>
      {/* <Loader isLoading={true} /> */}
      <Header
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        data={favorites}
      />
      <div className="container-fluid">
        <div className="row">
          {movies.map((movie, index) => (
            <>
              <div className="col-sm-4 col-lg-2 py-2" key={index}>
                <div
                  className="card image-container"
                  onClick={() => navigateDetail(movie)}
                >
                  <img
                    src={
                      'https://image.tmdb.org/t/p/w500' +
                      movie?.poster_path
                    }
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

export default List;
