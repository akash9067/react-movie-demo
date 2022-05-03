import PropTypes from 'prop-types';
import React from 'react';
import { LoaderStyled } from './LoaderStyled';

const Loader = (props) => {
    return (
        <>
            {props?.isLoading && (
                <LoaderStyled>
                    <div class="loader">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                </LoaderStyled>
            )}
        </>
    );
};

Loader.propTypes = {
    isLoading: PropTypes.bool,
};

export default Loader;
