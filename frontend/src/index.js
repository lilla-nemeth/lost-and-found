import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthContextProvider from './contexts/AuthContext';
import AppStateContextProvider from './contexts/AppStateContext';
import img01 from '../../assets/images/01backgroundImg.jpg';
import img02 from '../../assets/images/02backgroundImg.jpg';
import img03 from '../../assets/images/03backgroundImg.jpg';
import img04 from '../../assets/images/04backgroundImg.jpg';
import img05 from '../../assets/images/05backgroundImg.jpg';
import img06 from '../../assets/images/06backgroundImg.jpg';
import img07 from '../../assets/images/07backgroundImg.jpg';
import Video from '../../assets/video/dogvideo.mp4';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

useEffect(() => {
  cacheImages(images)


})

async function cacheImages(srcArr) {
  const promises = await srcArr.map(src => {
    return new Promise(function (resolve, reject) {
      const img = new Image();

      img.src = src
      img.onload = resolve()
      img.onerror = reject()
    })
  }) 

  await Promise.all(promises)
}

let images = [
  img01,
  img02,
  img03,
  img04,
  img05,
  img06,
  img07,
  Video
]

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <AppStateContextProvider>
          <App />
      </AppStateContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

