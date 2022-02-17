import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
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
    <div>
      <SearchBar
        setSearch={setSearch}
        getLines={getLines}
        lines={lines}
        search={search}
        setDetails={setDetails}
        setRedirectToDetails={setRedirectToDetails}
      />
      <div>
        {lines.map((line, i) => {
          return (
            <div key={i}>
              <p>{line.busLine}</p>
              <button
                onClick={() => {
                  if (auth) {
                    addToFavorites(line.busLine);
                  } else {
                    alert("please login or register");
                  }
                }}
              >
                add
              </button>
            </div>
          );
        })}
      </div>
      {redirectToDetails ? <Redirect to="/Details"></Redirect> : null}
    </div>
  );
}
