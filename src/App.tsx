import Footer from './components/Footer'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Booking from './components/pages/Booking';
import Landing from './components/pages/Landing';
import Menu from './components/pages/Menu';
import './styles/App.scss'
import Confirmation from './components/pages/Confirmation';
import Cancel from './components/pages/Cancel';
import Admin from './components/pages/Admin';

function App() {

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route path="/meny">
            <Menu />
          </Route>
          <Route path="/bokningsbekraftelse/:ref">
            <Confirmation></Confirmation>
          </Route>
          <Route path="/boka">
            <Booking />
          </Route>
          <Route path="/avboka/:ref">
            <Cancel/>
          </Route>
          <Route path="/admin">
          <Admin></Admin>
          </Route>
        </Switch>
      </Router>
      <Footer></Footer>
    </>
  );
}

export default App;