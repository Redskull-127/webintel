/* eslint-disable @next/next/no-img-element */
import styles from "../styles/NavBar.module.css";
import React, { useState, useEffect } from "react";

export default function NavBar() {
  useEffect(() => {
    fetcch();
  }, []);

  const [value, setValue] = useState("");
  const [apiData, setApiData] = useState([]);
  const [particularData, setParticularData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function dangrous(){
    return {__html: particularData.Description}
  }
  function fetcch() {
    fetch("https://haveibeenpwned.com/api/v2/breaches")
      .then((res) => res.json())
      .then((data) => {
        setApiData(data);
      })
      .catch((err) => console.log(err));
  }

  function onChange(){
    console.log("working")
    setIsLoading(false)
  }

  function onChangee(){
    console.log("working")
    setIsLoading(true)
  }

  function logg() {
    apiData.forEach((element) => {
      if (element.Name.toLowerCase() == value.toLowerCase()) {
        setParticularData(element)
        onChange();
      }
    });
    console.log(isLoading);
    console.log(particularData);
  }

  return (
    <>
      <div className={styles.NavBar}>
        <div className={styles.start}>
          <div className={styles.logo}>
            <img src="/Assets/webintel.png" alt="logo" />
          </div>
          <div className={styles.content}>
            <div className={styles.items}>
              <a>Home</a>
            </div>
            <div className={styles.items}>
              <a>About</a>
            </div>
            <div className={styles.items}>
              <a>Admin</a>
            </div>
          </div>
        </div>
        <div className={styles.end}>
          <input
            onChange={(e) => setValue(e.target.value)}
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            className="btn btn-outline-success"
            onClick={(e) => {
              if(document.getElementById("card")){
                document.getElementById("card").style.display = "flex";
              }
              logg();
            }}
          >
            Search
          </button>
        </div>
      </div>
      {particularData.length != 0 ? (
        <center>
          <div className={`card ${styles.card}`} id="card">
            <h1 className={`bi bi-x-lg ${styles.bi}`} onClick={(e) => {
              const card = document.getElementById("card");
              card.style.display = "none";
            }}></h1>
            <img
              src={particularData.LogoPath}
              className="card-img-top"
              alt={value}
            />
            <div className="card-body">
              <h5 className="card-title">{particularData.Title}</h5>
              <p id="cardtext" className="card-text" dangerouslySetInnerHTML={dangrous()}>
              </p>
              <p className="card-text">Leaked On : {particularData.BreachDate}</p>
              <p className="card-text">Total Leak : {particularData.PwnCount}</p>
              {particularData.IsVerified ? <p>Verified</p> : <p>Not Verified</p>}
              <a href={`https://${particularData.Domain}`} className="btn btn-primary">
                Visit {particularData.Name}
              </a>
            </div>
          </div>
        </center>
      ) : null}
      <center>
        <div className={styles.intro}>
          <h1>Search for breach Data</h1>
        </div>
        </center>
    </>
  );
}
