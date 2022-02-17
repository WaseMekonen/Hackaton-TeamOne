import React, { useState, useEffect } from "react";
import axios from "axios";

import styles from "./details.module.css";

export default function Details({ setDetails, setSearch, details, search }) {
  const [error, setError] = useState("");
  const [lineDetail, setLineDetail] = useState();
  const [green, setGreen] = useState("");
  const [yellow, setYellow] = useState("");
  const [orange, setOrange] = useState("");
  const [red, setRed] = useState("");

  useEffect(() => {
    isBusCrowded(details.numOfPassenger);
    getLineDetails();
  },[]);

  const getLineDetails = () => {
    setInterval(() => {
      console.log("test1:", details.busLine);
      axios
        .get(`/lines/${Number(details.busLine)}`)
        .then((response) => {
          console.log("test2:", details.busLine);

          setDetails(response.data.busLine);
          console.log("mmm", response.data);
        })
        .catch((err) => {
          setError(err);
        });
    }, 5000);
  };

  const isBusCrowded = (numOfPassenger) => {
    console.log({ numOfPassenger });
    if (numOfPassenger <= 12) {
      setGreen("Bus is Empty");
    } else if (numOfPassenger <= 25) {
      setYellow("Bus is Normal");
    } else if (numOfPassenger < 37) {
      setOrange("Bus is Full");
    } else {
      setRed("Bus is Crowded");
    }
  };

  return (
    <div className={styles.DetailsPage}>
      <div className={styles.mainCon}>
        <section className={styles.searchCont}>
          <div className={styles.search}>
            {/* <form
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
            </form> */}
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
          <div className={styles.statusEmpty}>{green}</div>
          <div className={styles.statusNormal}>{yellow}</div>
          <div className={styles.statusFull}>{orange}</div>
          <div className={styles.statusCrowded}>{red}</div>
        </section>
      </div>
    </div>
  );
}
