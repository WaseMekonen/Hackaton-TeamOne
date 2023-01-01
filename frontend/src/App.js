import React, { useState, useEffect } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Search from "./pages/search/Search";
import Favorites from "./pages/favorites/Favorites";
import Details from "./pages/details/Details";
import axios from "axios";
import "./App.css";

function App() {
  const [auth, setAuth] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [lines, setLines] = useState([]);
  const [search, setSearch] = useState("");
  const [details, setDetails] = useState("");

  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          {auth ? (
            <>
              <Link to="/Search">Search</Link>
              <Link to="/Favorites">Favorites</Link>
              <Link to="/Details">Details</Link>
              <button
                className="logOut"
                title="Log out"
                onClick={() => {
                  setAuth(null);
                  localStorage.clear();
                }}
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/Register">Register</Link>
              <Link to="/Login">Login</Link>
              {/* <Link to="/Search">Search</Link> */}
              {/* <Link to="/Details">Details</Link> */}
            </>
          )}
        </nav>
        <div className="container">
        <img className="home-img" src="/media/images/8493.jpg"/>
            <div className="content">
        <h1>EasyBusy</h1>
        <p>Get bus times, maps, and real-time arrival information with ease so that you can plan your trip with confidence.</p>
          </div>
        </div>
        <Switch>
          <Route exact path="/Register" render={() => <Register setAuth={setAuth} setFavorites={setFavorites} />} />
          <Route exact path="/Login" render={() => <Login setAuth={setAuth} setFavorites={setFavorites} />} />
          <Route exact path="/Favorites" render={() => <Favorites auth={auth} setDetails={setDetails} favorites={favorites} setFavorites={setFavorites} />} />

          <Route
            exact
            path="/Search"
            render={() => (
              <Search
                auth={auth}
                favorites={favorites}
                lines={lines}
                setLines={setLines}
                setFavorites={setFavorites}
                search={search}
                setSearch={setSearch}
                setDetails={setDetails}
              />
            )}
          />
          <Route
            exact
            path="/Details"
            render={() => (
              <Details
                details={details}
                search={search}
                lines={lines}
                setSearch={setSearch}
                setLines={setLines}
                setDetails={setDetails}
              />
            )}
          />

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
