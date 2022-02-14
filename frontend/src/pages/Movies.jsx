import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Movies = () => {
  const [movies, setmovies] = useState([])
  const URL = ""
  axios.get(URL)
  .then(res=>{
    if(res.status===200){
      setmovies(res.data);
    }
    else{
      
    }
  })
  return (
    <div>Movies</div>
  )
}

export default Movies