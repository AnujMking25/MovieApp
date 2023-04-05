import React,{useState} from 'react'

const InputMovieByUser = () => {
  const [NewMovieObj, setNewMovieObj] = useState({
    Title:'',
    Description:'',
    ReleaseDate:''
  })

   const onTitleHandler=(e)=>{
    setNewMovieObj({
      ...NewMovieObj,
      Title:e.target.value
    })
   }
   const onDescriptionHandler=(e)=>{
    setNewMovieObj({
      ...NewMovieObj,
      Description:e.target.value
    })
   }
   const onReleaseHandler=(e)=>{
    setNewMovieObj({
      ...NewMovieObj,
      ReleaseDate:e.target.value
    })
   }
   async function addMoviesHandler(movie){
    const response=await fetch('https://react-movies-app-46037-default-rtdb.firebaseio.com/movies.json',{
      method:'POST',
      body:JSON.stringify(movie),
      headers:{
        'Content-Type':'application/json'
      }
    })
    const data=await response.json();
    console.log(data);
   }
 const onShowMoviesIntheBrowser=(e)=>{
    e.preventDefault();
    console.log(NewMovieObj);
 addMoviesHandler(NewMovieObj);

 setNewMovieObj({
  Title:'',
  Description:'',
  ReleaseDate:''
 });
   }
  return (
    <>
    <form onSubmit={onShowMoviesIntheBrowser}>
        <label>Title</label><br/>
        <input type='text' value={NewMovieObj.Title} onChange={onTitleHandler}  /><br/>
        <label>Opening Text</label><br/>
        <textarea type='text' value={NewMovieObj.Description} onChange={onDescriptionHandler} rows="4" cols="50"/><br/>
        <label>Release Data</label><br/>
        <input type='date' value={NewMovieObj.ReleaseDate} onChange={onReleaseHandler}/><br/>
        <button type='submit'>Add Movie</button>
    </form>
    </>
  )
}

export default InputMovieByUser