import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import InputMovieByUser from "./components/InputMovieByUser";

function App() {
  const [movies, setmovies] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState(null);

  const fetchMovieHandler = useCallback(async () => {
    setisLoading(true);
    try {
      const response = await fetch(
        "https://react-movies-app-46037-default-rtdb.firebaseio.com/movies.json"
      );
      // console.log(response.ok);
      if (!response.ok) {
        throw new Error("Something went wrong ....Retrying");
      }
      const data = await response.json();
      console.log(data);
      const loadedMovies = [];
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].Title,
          openingText: data[key].Description,
          releaseDate: data[key].ReleaseDate,
        });
      }

      setmovies(loadedMovies);
    } catch (error) {
      seterror(error.message);
    }
    setisLoading(false);
  }, []);

  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler]);

  let constent = <p>Movies Not Found.</p>;
  if (movies.length > 0) {
    constent = <MoviesList movies={movies} />;
  }
  if (error) {
    constent = (
      <div>
        <p>{error}</p>
      </div>
    );
  }

  if (isLoading) {
    constent = <p>Loding....</p>;
  }
  return (
    <React.Fragment>
      <section>
        <InputMovieByUser />
      </section>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>{constent}</section>
    </React.Fragment>
  );
}

export default App;
