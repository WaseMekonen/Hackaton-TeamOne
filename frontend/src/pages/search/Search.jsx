import axios from 'axios'
import React, { useEffect } from 'react'
import SearchLine from '../../components/SearchLine'
import styles from './search.module.css'

export default function Search({ favorites, setFavorites, lines, setLines, auth, search, setSearch }) {

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

    axios.patch(`/users/${auth.localId}`, { favorites:temp })
      .then((response) => { setFavorites(temp) })
      .catch(error => console.log(error.response))
  }

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <SearchLine search={search} setSearch={setSearch} addToFavorites={addToFavorites} />
      </div>
      <br></br>
      <h3>Most active lines:</h3>
      <div className={styles.activeLinesContainer}>
        {lines.map((line, i) => {
          return (
            <div key={i} className={styles.activeLine}>
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
