import PropTypes from "prop-types";
import React from "react";
import { LoaderStyled } from "./LoaderStyled";

const Loader = (props) => {
  return (
    <>
      {props?.isLoading && (
        <LoaderStyled>
          <div className="loader">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
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
