import AuthContextProvider from './contexts/AuthContext';
import ApiContextProvider from './contexts/ApiContext';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import PetHome from './components/PetHome';
import './App.css';


function App() {

  // if token exists -> AuthContextProvider
  // if doesn't exist -> without it 

  //     <AuthContextProvider>
  //       {/* USER CONTENTS */}
  //     </AuthContextProvider>


  // * = default 

  // if (!token) {

    return (
      <>
        <BrowserRouter>
      <ApiContextProvider>
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
            </Switch>
        </ApiContextProvider>
          </BrowserRouter>
      </>
      );
  }

export default App;
