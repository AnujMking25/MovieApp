import React,{useState} from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies,setmovies]=useState([]);
  const [isLoading,setisLoading]=useState(false);
  const [error,seterror]=useState(null);

  async function fetchMovieHandler() {
    setisLoading(true);
    try {
      const response=await fetch("https://swapi.dev/api/films/");
     if(!response.ok)
    {
      throw new Error('Something went wrong ....Retrying')
    }
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
       
    } catch (error) {
      seterror(error.message)
    }
     setisLoading(false);    
  }

  let constent=<p>Movies Not Found.</p>
  if(movies.length>0){
    constent=<MoviesList movies={movies}/>
  }
  if(error){
    constent=<p>{error}</p>
  }
  if(isLoading){
constent=<p>Loding....</p>
  }
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {constent}
      </section>
    </React.Fragment>
  );
}

export default App;
