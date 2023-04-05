import React from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {
 async  function onDeleteMovie(){
    const response=await fetch('https://react-movies-app-46037-default-rtdb.firebaseio.com/movies.json'+props.id,{
      method:'DELETE',
    })
    const data=await response.json();
    // console.log("delete"+props.id);
    console.log("deleted "+ data);

  }
  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button onClick={onDeleteMovie}>Delete movie</button>
    </li>
  );
};

export default Movie;
