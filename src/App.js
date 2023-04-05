import React,{useState} from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies,setmovies]=useState([]);
  const [isLoading,setisLoading]=useState(false);
  async function fetchMovieHandler() {
    setisLoading(true);
    const response=await fetch("https://swapi.dev/api/films/");
    const data=await response.json();
     
        const transformedMovies= data.results.map(movieData=>{
          return {
            id:movieData.episode_id,
            title:movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate:movieData.release_date
          }
        })
        setmovies(transformedMovies)
        setisLoading(false);
      
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>

        {isLoading ? <p>Loding....</p>:<MoviesList movies={movies}/> }
      </section>
    </React.Fragment>
  );
}

export default App;
