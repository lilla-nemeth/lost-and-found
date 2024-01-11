import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from '../utils/ScrollToTop';
import Register from '../components/login-register/Register';
import Login from '../components/login-register/Login';
import PetHome from '../components/lost_and_found/PetHome';
import PetLandingPage from '../components/landing_page/PetLandingPage';
import PetProfile from '../components/lost_and_found/PetProfile';
import Navbar from '../components/navbar-footer/Navbar';
import Footer from '../components/navbar-footer/Footer';

function AppRoutesWithToken(props) {
    let { transparent } = props;
    
    let DEBUG = false;
    
    return (
      <>
        <BrowserRouter>
          <ScrollToTop>
            <Routes>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/register' element={<Register />}></Route>
              <Route
                path='/lostandfound'
                element={
                  <>
                    <Navbar />
                    <PetHome />
                    <Footer />
                  </>
                }
              ></Route>
              <Route
                path={'/petprofile/:id'}
                element={
                  <>
                    <Navbar />
                    <PetProfile />
                    <Footer />
                  </>
                }
              ></Route>
              <Route
                exact
                path='/'
                element={
                  <>
                    <Navbar transparent={transparent} />
                    <PetLandingPage />
                  </>
                }
              ></Route>
              <Route
                path='*'
                element={
                  <>
                    <Navbar transparent={transparent} />
                    <PetLandingPage />
                  </>
                }
              ></Route>
            </Routes>
          </ScrollToTop>
        </BrowserRouter>
      </>
    );
}

export default AppRoutesWithToken;
