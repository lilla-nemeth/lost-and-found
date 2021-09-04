import React, { useEffect, useState } from 'react';
import img01 from '../assets/images/01backgroundImg.jpg';
import img02 from '../assets/images/02backgroundImg.jpg';
import img03 from '../assets/images/03backgroundImg.jpg';
import img04 from '../assets/images/04backgroundImg.jpg';
import img05 from '../assets/images/05backgroundImg.jpg';
import img06 from '../assets/images/06backgroundImg.jpg';
import img07 from '../assets/images/07backgroundImg.jpg';
import BackgroundFade from './BackgroundFade';

const styles = {
    // backgroundContainer: {
    //     backgroundPosition: 'center',
    //     backgroundRepeat: 'no-repeat',
    //     backgroundSize: 'cover',
    //     display: 'flex',
    //     flexDirection: 'column',
    //     justifyContent: 'center',
    //     position: 'relative',
    //     height: '100vh',
    //     overflow: 'hidden',
    // },
}   

// FIX IT: useEffect -> array dependency as:
// load all images before rendering the whole page!

// FIX IT: fadeInOut() and changeIndex() functions require different intervals

const BackgroundImage = () => {
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState([img01, img02, img03, img04, img05, img06, img07]);
  const [fadeEffect, setFadeEffect] = useState({
    // fade: 'fade-in'
    fade: 'fade-out',
  });

  // 3 array elements for test:
  // const [images, setImages] = useState([img01, img02, img03]);
  
  let DEBUG = true;


  useEffect(() => {
    const interval = setInterval(() => {
      fadeInOut();
      changeIndex();
      }, 10000);
      if (interval) {
        return () => clearInterval(interval);
    }
  }, [fadeEffect]);


  function changeIndex() {
    const numberOfImages = images.length;
      if (index === numberOfImages - 1) {
        setIndex(0);
      } else {
        return setIndex(index + 1)
      }
  }

  function fadeInOut() {
    if (fadeEffect.fade === 'fade-out') {
        setFadeEffect({
            fade: 'fade-in'
        })
    } else {
        setFadeEffect({
            fade: 'fade-out'
        })
    }
  }


  const urlString = `url('${images[index]}')`;
  if (DEBUG) console.log(`url('${images[index]}')`);

  return (
    <>
      <div className='backgroundFilter'>
          <div className={fadeEffect.fade}>
            <div className='backgroundImage' style={{backgroundImage: urlString}}>
            </div>
          </div>
      </div>
    </>
  )
}

export default BackgroundImage;