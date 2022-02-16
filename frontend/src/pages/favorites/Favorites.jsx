import { React, useState } from "react";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import styles from "./favorites.module.css";
import axios from "axios";

export default function Favorites() {
  const [redirectToDetails, setRedirectToDetails] = useState(false);
  const [favoriteLines, setFavoriteLines] = useState();
  const [bg, setBg] = useState({ crowded: "red", Empty: "green" });
  if (redirectToDetails) {
    return <Redirect to="/Details" />;
  }

  const favoritesLines = [
    {
      num: 17,
      from: "Dizengoff",
      to: "Tel-Aviv Port",
      crowded: "Normal",
      imgSrc:
        "https://cdn-icons.flaticon.com/png/128/2040/premium/2040514.png?token=exp=1645019264~hmac=fb34ea7b8e8186e352ddddea10010ead",
    },
    {
      num: 89,
      from: "Savidor Train Station",
      to: "Azrieli Mall",
      crowded: "Empty",
      imgSrc:
        "https://cdn-icons.flaticon.com/png/128/2040/premium/2040514.png?token=exp=1645019264~hmac=fb34ea7b8e8186e352ddddea10010ead",
    },
  ];
  function makeRedirectToDetails() {
    setRedirectToDetails(true);
  }

  // !! remove from favorite lines list
  // function removeFromFavoriteList(i){
  //   const temp=[...favoritesLines]
  //   setFavoriteLines(temp)
  //   temp.splice(i,1)
  //   }

  const lines = favoritesLines.map((line, i) => (
    <div className={styles.favoritesDiv} key={i}>
      <section className={styles.headers}>
        <p>Bus NO. {line.num} |</p>
        <p>
          From: {line.from}{" "}
          <img className={styles.rightArrow} src={line.imgSrc} alt="" />
        </p>
        <p>{line.to}</p>
      </section>
      <section className={styles.red} style={{ background: bg[line.crowded] }}>
        <h5>CROWDED</h5>
      </section>
      <button onClick={makeRedirectToDetails}>More Details</button>
      <button>Delete From Favorites</button>
    </div>
  ));

  // switch (favoritesLines.crowded) {
  //   case 'Normal':
  //   className={styles.green}

  // }

  return (
    <div>
      <p>Favorites</p>
      {/* <div className={styles.favoritesDiv}>
        <section className={styles.headers}>
          <p>
            <h3>Bus NO. : XXX | </h3>
          </p>
          <p>
            <h3>from: xxx | </h3>
          </p>
          <p>
            <h3>To: xxx | </h3>
          </p>
        </section>
        <section className={styles.crowded}>
          <article className={styles.green}></article>
          <article className={styles.yellow}></article>
          <article className={styles.orange}></article>
          <article className={styles.red}></article>
        </section>
        <section>
          <button className={styles.button}>More Details</button>
        </section> */}
      {lines}
    </div>
    // </div>
  );
}
