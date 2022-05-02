import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Common/Header/Header';
import { useNavigate } from 'react-router-dom';
import './Common.css'

const List = () => {
    const navigate = new useNavigate();
    const [movies, setMovies] = useState([]);
    const [searchValue, setSearchValue] = useState('Marvel');
    const [favorites, setFavorites] = useState([]);

    const getMovieRequest = async (query) => {
        const url = `https://api.themoviedb.org/3/movie/550?api_key=5567a607e97634a52b7ffdc87eae7dc3`;

        const response = await fetch(url);
        const responseJson = await response.json();
        console.log("line 18",response,responseJson);
        if (responseJson.Search) {
            setMovies(responseJson.Search);
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
        navigate(`/detail/${data?.imdbID}`, { state: data });
    };

    return (
        <div>
            <Header searchValue={searchValue} setSearchValue={setSearchValue} data={favorites} />
            <div className='container-fluid'>
                <div className='row'>
                    {movies.map((movie, index) => (
                        <>
                            <div className='col-sm-4 col-lg-2 py-2' key={index} >
                                <div class="card image-container" onClick={() => navigateDetail(movie)}>
                                    <img src={movie.Poster} alt='movie' className='card-img-top w-100 h-100' />
                                    <div className='card-img-overlay overlay'>
                                        <div className="card-text overlay-text" onClick={() => { addFavouriteMovie(movie) }}>Add to Favorites</div>
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
    )
}

export default List;
