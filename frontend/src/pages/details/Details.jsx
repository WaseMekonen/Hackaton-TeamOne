import React, { useEffect, useState } from "react";
import axios from "axios";

import styles from "./details.module.css";
import SearchBar from "../../components/SearchBar";

export default function Details({ details, setSearch }) {
  const [error, setError] = useState("");
  const [lineDetail, setLineDetail] = useState("");

  const getLineDetails = () => {
    setInterval(() => {
      axios
        .get(`/lines/${details}`)
        .then((response) => {
          setLineDetail(response.data);
        })
        .catch((err) => {
          setError(err);
        });
    }, 5000);
  };

  const isBusCrowded = (numOfPassenger) => {
    if (numOfPassenger <= 12) {
      return "Bus is Empty";
    } else if (numOfPassenger <= 25) {
      return "Bus is Normal";
    } else if (numOfPassenger < 37) {
      return "Bus is Full";
    }
    return "Bus is Crowded";
  };

  // console.log(isBusCrowded(4));

  return (
    <div className={styles.DetailsPage}>
      <div className={styles.mainCon}>
        <section className={styles.searchCont}>
          <div className={styles.search}>
            {/* <SearchBar
              setSearch={setSearch}
              lines={lines}
              search={search}
            /> */}
            <input
              type="text"
              onChange={(e) => {
                setSearch(Number(e.target.value));
              }}
            />
            <button
              onClick={() => {
                getLineDetails();
              }}
            >
              Search
            </button>
          </div>
        </section>
        <section className={styles.lineDetailsCont}>
          <h3>Line Number:{lineDetail.busLine}</h3>
          <h3>From {lineDetail.start}</h3>
          <h3>To {lineDetail.end}</h3>
          <button className={styles.ChangeDirectionBtn}>
            Change Direction
          </button>
        </section>
        <section className={styles.stationCont}>
          <h3>
            Current Station: {lineDetail.stations[details.currentStation]}
          </h3>
        </section>
        <section className={styles.mapCont}>
          <img src={lineDetail.images[details]} alt="" />
        </section>
        <section className={styles.statusCont}>
          <div className={styles.statusEmpty}>Empty</div>
          <div className={styles.statusNormal}>Normal</div>
          <div className={styles.statusFull}>Full</div>
          <div className={styles.statusCrowded}>Crowded</div>
        </section>
      </div>
    </div>
  );
}
