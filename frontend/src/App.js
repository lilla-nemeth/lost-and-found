import React, { useContext, useEffect } from 'react';
import { AuthContext } from './contexts/AuthContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ScrollToTop from './components/ScrollToTop';

import Video from './assets/video/dogvideo.mp4';
import img01 from './assets/images/01backgroundImg.jpg';
import img02 from './assets/images/02backgroundImg.jpg';
import img03 from './assets/images/03backgroundImg.jpg';
import img04 from './assets/images/04backgroundImg.jpg';
import img05 from './assets/images/05backgroundImg.jpg';
import img06 from './assets/images/06backgroundImg.jpg';
import img07 from './assets/images/07backgroundImg.jpg';

import Navbar from './components/navbar-footer/Navbar';
import Footer from './components/navbar-footer/Footer';
import Register from './components/login-register/Register';
import Login from './components/login-register/Login';
import PetHome from './components/lost_and_found/PetHome';
import PetReport from './components/report_pet/PetReport';
import PetLandingPage from './components/landing_page/PetLandingPage';
import PetProfile from './components/lost_and_found/PetProfile';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  const { token } = useContext(AuthContext);

  let transparent = true;

  let DEBUG = false;

  if (DEBUG) console.log('App.js', token);

  useEffect(() => {
    cacheImages(images);
  });

  async function cacheImages(srcArr) {
    const promises = await srcArr.map((src) => {
      return new Promise(function (resolve, reject) {
        const img = new Image();

        img.src = src;
        img.onload = resolve();
        img.onerror = reject();
      });
    });

    await Promise.all(promises);
  }

  let images = [Video, img01, img02, img03, img04, img05, img06, img07];

  if (!token) {
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

export default App;
