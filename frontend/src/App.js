import { useState, useEffect } from "react";
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
        {auth ? (
          <>
            <Link to="/Search">Search</Link>
            <Link to="/Favorites">Favorites</Link>
            <Link to="/Details">Details</Link>
            <button
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
            <Link to="/Search">Search</Link>
            <Link to="/Details">Details</Link>
          </>
        )}
        <Switch>
          
          <Route exact path="/Register" render={() =><Register setAuth={setAuth} setFavorites={setFavorites}/>} />
          <Route exact path="/Login" render={() =><Login setAuth={setAuth} setFavorites={setFavorites}/>} />
          <Route exact path="/Favorites" render={() =><Favorites auth={auth} setDetails={setDetails} favorites={favorites} setFavorites={setFavorites} />} />
        
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
              />
            )}
          />
          
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
