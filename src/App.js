import React,{useState,useEffect, useCallback} from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies,setmovies]=useState([]);
  const [isLoading,setisLoading]=useState(false);
  const [error,seterror]=useState(null);

  const fetchMovieHandler= useCallback(async () => {
    setisLoading(true);
    try {
      const response=await fetch("https://swapi.dev/api/film/");
      // console.log(response.ok);
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
  },[])

useEffect(() => {
  fetchMovieHandler()

}, [fetchMovieHandler])

  let constent=<p>Movies Not Found.</p>
  if(movies.length>0){
    constent=<MoviesList movies={movies}/>
  }
  if(error){   
    constent=<div><p>{error}</p></div>
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
