import React from "react";
import { Route, Routes } from "react-router-dom";
import MovieDetail from "./components/Movie/Detail";
import Favorites from "./components/Movie/Favorites";
import MovieList from "./components/Movie/List";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/detail/:id" element={<MovieDetail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/movies" element={<MovieList />} />
        <Route path="/sries" element={<MovieList selected='series' />} />
      </Routes>
    </>
  );
}

export default App;
