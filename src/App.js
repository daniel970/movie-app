import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import "./App.css";

function App() {
  const [selectedGenre, setSelectedGenre] = useState("");

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
  };

  const Layout = () => {
    const location = useLocation();
    const showNavBar = location.pathname === "/";

    return (
      <>
        {showNavBar && (
          <nav className="genre-nav">
            <button onClick={() => handleGenreChange("")}>All</button>
            <button onClick={() => handleGenreChange("Action")}>Action</button>
            <button onClick={() => handleGenreChange("Drama")}>Drama</button>
            <button onClick={() => handleGenreChange("Comedy")}>Comedy</button>
            <button onClick={() => handleGenreChange("Romance")}>
              Romance
            </button>
            <button onClick={() => handleGenreChange("Sci-Fi")}>Sci-Fi</button>
          </nav>
        )}
        <Routes>
          <Route
            path={`${process.env.PUBLIC_URL}/`}
            element={<Home selectedGenre={selectedGenre} />}
          />
          <Route path="/movie/:id" element={<Detail />} />
        </Routes>
      </>
    );
  };

  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
