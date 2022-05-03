import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from '../../Common/Component';
import { useNavigate, useLocation } from 'react-router-dom';

const Favorites = () => {
    const navigate = new useNavigate();
    const location = new useLocation();
    const [searchValue, setSearchValue] = useState('Marvel')

    const navigateDetail = (data) => {
        navigate(`/detail/${data?.imdbID}`, { state: data });
    };
    return (
        <div>
            <Header searchValue={searchValue} setSearchValue={setSearchValue} />
            <div className='container-fluid'>
                <div className='row'>
                    {location?.state?.map((movie, index) => (
                        <>
                            <div className='col-sm-4 col-lg-2 ' key={index} onClick={() => navigateDetail(movie)}>
                                <div>
                                    <img src={movie.Poster} alt='movie' className='img-fluid w-100 h-100 py-2' />
                                    <div>{movie.Title}</div>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Favorites;
