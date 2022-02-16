import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import Register from './pages/register/Register';
import Login from './pages/login/Login'
import Search from './pages/search/Search';
import Favorites from './pages/favorites/Favorites';
import Details from './pages/details/Details';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Link to='/Register' >Register</Link>
        <Link to='/Login' >Login</Link>
        <Link to='/Search' >Search</Link>
        <Link to='/Favorites'>Favorites</Link>
        <Link to='/Details' >Details</Link>
        <Switch>
          <Route exact path="/Register" render={() => <Register />} />
          <Route exact path="/Login" render={() => <Login />} />
          <Route exact path="/Search" render={() => <Search />} />
          <Route exact path="/Favorites" render={() => <Favorites />} />
          <Route exact path="/Details" render={() => <Details />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
