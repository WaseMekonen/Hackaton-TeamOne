import axios from 'axios'
<<<<<<< HEAD
import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
=======
import React, { useEffect } from 'react'
>>>>>>> ca76da1f3c22f7423e144b68f72555279df5705e
import SearchLine from '../../components/SearchLine'
import styles from './search.module.css'

export default function Search({ favorites, setFavorites, lines, setLines, auth }) {

  useEffect(() => { getMostActiveLines() }, [])

  function getMostActiveLines() {
    axios.get('/lines/PopularLines')
      .then((response) => {
        console.log(response); setLines(response.data);
      })
      .catch((error) => console.log(error))
  }

  function addToFavorites(busLine) {
    let temp = [...favorites];
    temp.push(busLine);

    axios.patch(`/users/${auth.localId}`, { favorites })
      .then((response) => { setFavorites(temp) })
      .catch(error => console.log(error.response))
  }

  return (
    <div>
      <div>
        <SearchLine />
      </div>
      <div>
        {lines.map((line, i) => {
          return (
            <div key={i}>
              <p>{line.busLine}</p>
              <button onClick={() => {
                if (auth) {
                  addToFavorites(line.busLine)
                }
                else {
                  alert("please login or register")
                }
              }
              }>add</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
