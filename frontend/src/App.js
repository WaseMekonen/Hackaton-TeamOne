<<<<<<< HEAD
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Search from "./pages/search/Search";
import Favorites from "./pages/favorites/Favorites";
import Details from "./pages/details/Details";
import "./App.css";
=======
import { useState } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import Register from './pages/register/Register';
import Login from './pages/login/Login'
import Search from './pages/search/Search';
import Favorites from './pages/favorites/Favorites';
import Details from './pages/details/Details';
import './App.css';
>>>>>>> 60285de8443cfa75a25576b01028cd5401d7c766

function App() {
  const [auth, setAuth] = useState(null);

  return (
    <div className="App">
      <BrowserRouter>
<<<<<<< HEAD
        <Link to="/Register">Register</Link>
        <Link to="/Login">Login</Link>
        <Link to="/Search">Search</Link>
        <Link to="/Favorites">Favorites</Link>
        <Link to="/Details">Details</Link>
=======
        <Link to='/Register'>Register</Link>
        <Link to='/Login'>Login</Link>
        <Link to='/Search'>Search</Link>
        <Link to='/Favorites'>Favorites</Link>
        <Link to='/Details'>Details</Link>
        <button title='Log out' onClick={() => { setAuth(null); localStorage.clear() }}>Log out</button>
>>>>>>> 60285de8443cfa75a25576b01028cd5401d7c766
        <Switch>
          <Route exact path="/Register" render={() => <Register setAuth={setAuth} />} />
          <Route exact path="/Login" render={() => <Login setAuth={setAuth} />} />
          <Route exact path="/Search" render={() => <Search />} />
          <Route exact path="/Details" render={() => <Details />} />
          <Route exact path="/Favorites" render={() => <Favorites />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
