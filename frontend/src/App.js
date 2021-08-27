import './App.css';
import AuthContextProvider from './contexts/AuthContext';
import PetHome from './components/PetHome';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";


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


             <Navbar />
       {/*   <Switch>
            <Route path='*'>
              <PetHome />
            </Route>
            <Route path='/'>
              <PetHome />
            </Route> */}

          <Switch>

            <Route path='/register'>
              <Register />
            </Route>
            <Route path='/login'>
              <Login />
            </Route>

          </Switch>

        </BrowserRouter>
      </>
      );
  } 


  // return (
    //   <>
    //   <BrowserRouter>
    //     {/* Navbar Component */}
    //     <Switch>
    //       <Route exact path='/'>
    //         {/* PetHome */}
    //       </Route>
    //       <Route path='*'>
    //         {/* PetHome */}
    //       </Route>
    //     </Switch>
    //   </BrowserRouter>
    // </>
    // );

// }

export default App;
