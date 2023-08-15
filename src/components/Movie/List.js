import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header, Loader } from "../../Common/Component";
import "./Common.css";
import CardWithOverlay from "../../Common/Component/Card/card";

const List = ({ selected }) => {
  const navigate = new useNavigate();
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("Marvel");
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  const getMovieRequest = async () => {
    setLoading(true);
    let url =
      "https://api.themoviedb.org/3/trending/all/day?api_key=5567a607e97634a52b7ffdc87eae7dc3";
    if (selected) {
      url = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&api_key=5567a607e97634a52b7ffdc87eae7dc3`;
    }
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson?.results) {
      setLoading(false);
      setMovies(responseJson?.results);
    }
  };

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favorites, movie];
    setFavorites(newFavouriteList);
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue, selected]);

  const navigateDetail = (data) => {
    navigate(`/detail/${data?.original_title}`, { state: data });
  };

  return (
    <div>
      <Loader isLoading={loading} />
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
            // <CardWithOverlay
            //   imageSrc={"https://image.tmdb.org/t/p/w500" + movie?.poster_path}
            //   title={movie?.original_title}
            // />
          ))}
        </div>
      </div>
    </div>
  );
};

export default List;
