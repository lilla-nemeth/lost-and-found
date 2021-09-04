import React, { useEffect, useState } from 'react';
import img01 from '../assets/images/01backgroundImg.jpg';
import img02 from '../assets/images/02backgroundImg.jpg';
import img03 from '../assets/images/03backgroundImg.jpg';
import img04 from '../assets/images/04backgroundImg.jpg';
import img05 from '../assets/images/05backgroundImg.jpg';
import img06 from '../assets/images/06backgroundImg.jpg';
import img07 from '../assets/images/07backgroundImg.jpg';

const styles = {
    backgroundContainer: {
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
    },
    filter: {
        filter: 'brightness(70%)',
    }
}   

// FIX IT: useEffect -> array dependency as:
// load all images before rendering the whole page!

const BackgroundImage = () => {
  const [count, setCount] = useState(0);
  const [images, setImages] = useState([img01, img02, img03, img04, img05, img06, img07]);

  let DEBUG = true;

  useEffect(() => {
    const interval = setInterval(() => {
        countLimit();
      }, 1200);
      if (interval) {
        return () => clearInterval(interval);
    }
  });

  function countLimit() {
    const numberOfImages = images.length;
      if (count === numberOfImages - 1) {
        setCount(0);
      } else {
        return setCount(count + 1)
      }
  }

  const urlString = `url('${images[count]}')`;
  if (DEBUG) console.log(`url('${images[count]}')`);

  return (
    <>
      <div style={styles.filter}>
          <div style={{backgroundImage: urlString}}>
            <div style={styles.backgroundContainer}>
            </div>
          </div>
      </div>
    </>
  )
}

export default BackgroundImage;