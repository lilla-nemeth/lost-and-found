import { useContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
import './App.css';
import Navbar from './components/Navbar';
import Register from './components/login_register/Register';
import Login from './components/login_register/Login';
import PetHome from './components/lost_and_found/PetHome';
import PetReport from './components/report_pet/PetReport';
import PetLandingPage from './components/landing_page/PetLandingPage';
import ImageUpload from './components/report_pet/ImageUpload';

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
          <Route exact path='/lostandfound'>
            <Navbar />
            <PetHome />
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
          <Route path='/single'>
              <Navbar />
              <ImageUpload />
            </Route>
            <Route path='/reportpet'>
              <Navbar />
              <PetReport />
            </Route>
            <Route path='/lostandfound'>
              <Navbar />
              <PetHome />
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
