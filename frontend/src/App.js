// import AuthContextProvider, { AuthContext } from './contexts/AuthContext';
import ApiContextProvider from './contexts/ApiContext';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import PetHome from './components/PetHome';
import PetReport from './components/PetReport';
import './App.css';
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';


function App() {

const { token, setToken, handleLogOut } = useContext(AuthContext);
  // * = default 

  console.log('APP componens', token);

  if (!token) {
    return (
      <>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <Navbar />
            <PetHome />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/login'>
            <Login />
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
            <Route exact path='/'>
                <Navbar />
                <PetHome />
            </Route>
            <Route path='/reportpet'>
                <Navbar />
                <PetReport />
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
