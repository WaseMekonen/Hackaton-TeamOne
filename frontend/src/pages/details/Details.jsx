import React, { useState } from "react";
import axios from "axios";

import styles from "./details.module.css";

export default function Details({ setDetails, setSearch, details, search }) {
  const [error, setError] = useState("");
  const [lineDetail, setLineDetail] = useState("");

  const getLineDetails = () => {
    setInterval(() => {
      axios
        .get(`/lines/${details.busLine}`)
        .then((response) => {
          setLineDetail(response.data);
          console.log(response.data);
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setDetails(search);
              }}
            >
              <input
                type="text"
                onChange={(e) => {
                  setSearch(Number(e.target.value));
                }}
              />
              <input type="submit" value="Search" />
            </form>
          </div>
        </section>
        <section className={styles.lineDetailsCont}>
          <h3>Line Number:{details.busLine}</h3>
          <h3>From {details.start}</h3>
          <h3>To {details.end}</h3>
          <button className={styles.ChangeDirectionBtn}>
            Change Direction
          </button>
        </section>
        <section className={styles.stationCont}>
          <h3>
            {/* Current Station: {details.stations[details.currentStation]} */}
          </h3>
        </section>
        <section className={styles.mapCont}>
          {/* <img src={details.images[details]} alt="" /> */}
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
