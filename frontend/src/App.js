import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Link to='/TvShows' >Movies</Link>
        <Link to='/Movies' >Tv Shows</Link>
        <Switch>
          <Route exact path="/TvShows" render={() => <TvShows />} />
          <Route exact path="/Movies" render={() => <Movies />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
