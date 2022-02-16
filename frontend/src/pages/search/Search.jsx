import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SearchLine from '../../components/SearchLine'
import styles from './search.module.css'

export default function Search({ favorites, setFavorites, lines, setLines }) {
  const [redirectToFavorites, setRedirectToFavorites] = useState(false)
  // const arr = [{ busLine: "126" }, { busLine: "6" }, { busLine: "16" }, { busLine: "12" }]

useEffect(() => {getMostActiveLines()}, [])

  function getMostActiveLines() {
    axios.get('/lines')
      .then((response) => {
        console.log(response); setLines(response.data);
        // Math.floor(Math.random() * 5)
      })
      .catch((error) => console.log(error))
  }
  
// console.log(lines);
  // function addToFavorites() {
  //   axios.patch(`/users/localId}`,

  //)
  //   .then((response) => { console.log(response) })
  //   .catch(error => console.log(error.response))
  // }

  if (redirectToFavorites) {
    return <Redirect to='/Favorites' />
  }

  return (
    <div>
      <div>
        <Link to='/Login'>Login</Link>
        <Link to='/register'>Register</Link>
      </div>
      <div>
        <SearchLine />
      </div>
      <div>
        <p>{lines}</p>
      </div>
    </div>
  )
}
