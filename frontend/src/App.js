import { useContext } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AuthContext } from './contexts/AuthContext';
import './App.css';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import PetHome from './components/PetHome';
import PetReport from './components/PetReport';

function App() {

  const { token } = useContext(AuthContext);

  let DEBUG = false;

  if (DEBUG) console.log('APP component', token);

  if (!token) {
    return (
      <>
      <BrowserRouter>
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
          <Route exact path='/'>
            <Navbar />
            <PetHome />
          </Route>
          <Route path='*'>
            <Navbar />
            <PetHome />
          </Route>
        </Switch>
      </BrowserRouter>
      </>
    );
  }

    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route path='/reportpet'>
              <Navbar />
              <PetReport />
            </Route>
            <Route exact path='/'>
              <Navbar />
              <PetHome />
            </Route>
            <Route path='*'>
              <Navbar />
              <PetReport />
            </Route>
          </Switch>
        </BrowserRouter>
      </>
      );
  }

export default App;
