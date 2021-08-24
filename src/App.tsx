import Footer from './components/Footer'
import { Route,BrowserRouter as Router, Switch } from 'react-router-dom';
import Booking from './components/pages/Booking';
import Landing from './components/pages/Landing';
import Menu from './components/pages/Menu';
import './styles/App.scss'

function App() {

  return (
    <>
    <Router>
      <Switch>
        <Route exact path="/">
          <Landing/>
        </Route>
        <Route path="/meny">
          <Menu/>
        </Route>
        <Route path="/boka">
          <Booking/>
        </Route>
      </Switch>
    </Router>
    <Footer></Footer>
  </>
  );
}

export default App;
