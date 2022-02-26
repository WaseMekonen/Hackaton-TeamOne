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
    getLineDetails();
  }, []);

  const getLineDetails = () => {
    setInterval(() => {
      axios
        .get(`/lines/${Number(details.busLine)}`)
        .then((response) => {
          isBusCrowded(response.data.numOfPassenger);
          setDetails(response.data);
        })
        .catch((err) => {
          setError(err);
        });
    }, 5000);
  };

  const isBusCrowded = (numOfPassenger) => {
    if (numOfPassenger <= 12) {
      setGreen("Choose a seat and enjoy the ride");
      setRed("");
      setYellow("");
      setOrange("");
    } else if (numOfPassenger <= 25) {
      setYellow("Luckily half an empty bus");
      setRed("");
      setGreen("");
      setOrange("");
    } else if (numOfPassenger < 37) {
      setOrange("Forget the seats on this trip");
      setRed("");
      setGreen("");
      setYellow("");
    } else {
      setRed("Get ready to stand for distances");
      setYellow("");
      setGreen("");
      setOrange("");
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
          <h3>Line Number: {details.busLine}</h3>
          <h3>From: {details.start}</h3>
          <h3>To: {details.end}</h3>
          <button className={styles.ChangeDirectionBtn}>Change Direction</button>
        </section>
        <section className={styles.stationCont}>
          <h3>Current Station: {details.stations[details.currentStation]}</h3>
        </section>
        <section className={styles.mapCont}>
          <img src={details.images[2]} alt="Current station map" />
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
