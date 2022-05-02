import MovieList from './components/Movie/List';
import { Routes, Route } from "react-router-dom";
import MovieDetail from './components/Movie/Detail';
import Favorites from './components/Movie/Favorites';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/detail/:id" element={<MovieDetail />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </>
  );
}

export default App;
