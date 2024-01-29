import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from '../utils/ScrollToTop';
import PetHome from '../components/lost_and_found/PetHome';
import PetReport from '../components/report_pet/PetReport';
import PetLandingPage from '../components/landing_page/PetLandingPage';
import PetProfile from '../components/lost_and_found/PetProfile';
import Dashboard from '../components/dashboard/Dashboard';
import Navbar from '../components/navbar-footer/Navbar';
import Footer from '../components/navbar-footer/Footer';

function AppRoutesWithoutToken(props) {
    let { transparent } = props;

    let DEBUG = false;
    
    return (
        <>
          <BrowserRouter>
            <ScrollToTop>
              <Routes>
                <Route
                  path='/reportpet'
                  element={
                    <>
                      <Navbar />
                      <PetReport />
                      <Footer />
                    </>
                  }
                ></Route>
                <Route
                  path='/dashboard'
                  element={
                    <>
                      <Navbar />
                      <Dashboard />
                      <Footer />
                    </>
                  }
                ></Route>
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
                      <Navbar />
                      <PetReport />
                      <Footer />
                    </>
                  }
                ></Route>
              </Routes>
            </ScrollToTop>
          </BrowserRouter>
        </>
    );
}

export default AppRoutesWithoutToken;