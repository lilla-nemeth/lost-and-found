import AuthContextProvider, { AuthContext } from './contexts/AuthContext';
import ApiContextProvider from './contexts/ApiContext';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import PetHome from './components/PetHome';
import PetReport from './components/PetReport';
import './App.css';
import { useContext } from 'react';


function App() {
  // const {token, setToken, handleLogOut} = useContext(AuthContext);


  // * = default 


    return (
      <>
        <BrowserRouter>
          <AuthContextProvider>

            <ApiContextProvider>
                <Switch>
                  <Route exact path='/'>
                    <Navbar />
                    <PetHome />
                  </Route>
                  <Route path='/reportpet'>
                    <Navbar />
                    <PetReport />
                  </Route>
                  <Route path='/register'>
                    <Register />
                  </Route>
                  <Route path='/login'>
                    <Login/>
                  </Route>
                </Switch>
              </ApiContextProvider>

            </AuthContextProvider>
          </BrowserRouter>
      </>
      );
  }

export default App;
