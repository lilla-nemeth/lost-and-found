import { useContext, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
import './App.css';
import Navbar from './components/Navbar';
import Register from './components/login-register/Register';
import Login from './components/login-register/Login';
import PetHome from './components/lost_and_found/PetHome';
import PetReport from './components/report_pet/PetReport';
import PetLandingPage from './components/landing_page/PetLandingPage';
import PetProfile from './components/lost_and_found/PetProfile';

function App() {
  const { token } = useContext(AuthContext);
  const [id, setId] = useState();

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
          <Route path='/lostandfound'>
            <Navbar />
            <PetHome />
          </Route>
          <Route path={'/petprofile/:id'}>
            <Navbar />
            <PetProfile/>
          </Route>
          <Route exact path='/'>
            <Navbar />
            <PetLandingPage />
          </Route>
          <Route path='*'>
            <Navbar />
            <PetLandingPage />
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
            <Route path='/lostandfound'>
              <Navbar />
              <PetHome />
            </Route>
            <Route path={'/petprofile/:id'}>
              <Navbar />
              <PetProfile/>
            </Route>
            <Route exact path='/'>
              <Navbar />
              <PetLandingPage />
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
