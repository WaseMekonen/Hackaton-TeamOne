import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import SearchLine from '../../components/SearchLine'
import styles from './search.module.css'

export default function Search({ favorites, setFavorites, lines, setLines }) {
  const [redirectToFavorites, setRedirectToFavorites] = useState(false)

  useEffect(() => { getMostActiveLines() }, [])

  function getMostActiveLines() {
    axios.get('/mostPopularLines')
      .then((response) => {
        console.log(response); setLines(response.data);
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
        {lines.map((line, i) => {
          return (
            <>
            <p>{line.busLine}</p>
            <button onClick={() => setRedirectToFavorites(true)}>add</button>
            </>
          )
        })}
      </div>
    </div>
  )
}
