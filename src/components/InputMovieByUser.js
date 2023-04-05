import React,{useRef} from 'react'

const InputMovieByUser = () => {
    const titleName = useRef('')
    const OpeningText = useRef('')
    const ReleaseDate = useRef('')
    const NewMovieObj={
        MovieName: titleName.current.value,
        OpeningText:OpeningText.current.value,
        ReleaseDate: ReleaseDate.current.value
    }
   const onShowMoviesIntheBrowser=(e)=>{
    e.preventDefault();
   
    console.log(NewMovieObj);
  
   }
  return (
    <>
    <form onSubmit={onShowMoviesIntheBrowser}>
        <label>Title</label><br/>
        <input type='text' ref={titleName}/><br/>
        <label>Opening Text</label><br/>
        <textarea type='text' ref={OpeningText} rows="4" cols="50"/><br/>
        <label>Release Data</label><br/>
        <input type='text' ref={ReleaseDate}/><br/>
        <button>Add Movie</button>
    </form>
    </>
  )
}

export default InputMovieByUser