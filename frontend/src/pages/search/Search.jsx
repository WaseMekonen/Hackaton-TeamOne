import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
// import { FaPlus } from "react-icons/fa"
// import { AiOutlinePlusCircle } from "react-icons/ai";
import SearchBar from "../../components/SearchBar";

import styles from "./search.module.css";

export default function Search({
  favorites,
  setFavorites,
  auth,
  lines,
  setLines,
  setDetails,
  search,
  setSearch
}) {
  const [redirectToDetails, setRedirectToDetails] = useState(false);

  // useEffect(() => {
  //   getMostActiveLines();
  // }, []);

  useEffect(() => {
    getLines();
  }, []);

  function getMostActiveLines() {
    axios
      .get("/PopularLines")
      .then((response) => {
        console.log(response);
        setLines(response.data);
      })
      .catch((error) => console.log(error));
  }

  function addToFavorites(busLine) {
    let temp = [...favorites];
    temp.push(busLine);

    axios
      .patch(`/users/${auth.localId}`, { favorites: temp })
      .then((response) => {
        setFavorites(temp);
      })
      .catch((error) => console.log(error.response));
  }

  const getLines = () => {
    axios
      .get("/lines")
      .then((response) => {
        console.log(response.data);
        setLines(response.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className={styles.searchContainer}>
      <br></br><br></br><br></br><br></br>
      <SearchBar
        setSearch={setSearch}
        getLines={getLines}
        lines={lines}
        search={search}
        setDetails={setDetails}
        setRedirectToDetails={setRedirectToDetails}
      /><br></br>
      <div className={styles.lines}>
        {lines.map((line, i) => {
          return (
            <div key={i} className={styles.section}>
              <p>{line.busLine}</p>
              <button
                className={styles.btn}
                onClick={() => {
                  if (auth) {
                    addToFavorites(line.busLine);
                  } else {
                    alert("please login or register");
                  }
                }}
              >
                <img className={styles.btnImg} title='Add to favorites' src="/media/images/plus.png"/>
              </button>
            </div>
          );
        })}
      </div>
      {redirectToDetails ? <Redirect to="/Details"></Redirect> : null}
    </div>
  );
}
