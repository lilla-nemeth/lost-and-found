import React, { useEffect, useState } from 'react';
import '../App.css';
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


const BackgroundImage = () => {
  const [fadeEffect1, setFadeEffect1] = useState({
    fade: 'fade-in1'
  });
  const [fadeEffect2, setFadeEffect2] = useState({
    fade: 'fade-in2'
  });

  // const [images, setImages] = useState([img01, img02, img03, img04, img05, img06, img07]);
  const [images1, setImages1] = useState([img01, img02, img02, img03, img03, img04, img04, img05, img05, img06, img06, img07, img07, img01]);
  const [images2, setImages2] = useState([img01, img01, img02, img02, img03, img03, img04, img04, img05, img05, img06, img06, img07, img07, img01]);
  const [indexImages, setIndexImages] = useState(0);
 
  let DEBUG = true;

  // 7000
  useEffect(() => {
    const imagesInterval = setInterval(() => {
      changeImagesIndex(images2);
      changeImagesIndex(images1);
      fadeInOut2();
      fadeInOut1();
      }, 1000);
      if (imagesInterval) {
        return () => clearInterval(imagesInterval);
    }
  }, [images1, images2, fadeEffect1, fadeEffect2]);


  function changeImagesIndex(arr) {
    const numberOfImages = arr.length;
      if (indexImages === numberOfImages - 1) {
        return setIndexImages(0);
      } else {
        return setIndexImages(indexImages + 1);
      }
  }

  function fadeInOut1() {
    if (fadeEffect1.fade === 'fade-in1') {
        setFadeEffect1({
            fade: 'fade-out1'
        })
    } else {
        setFadeEffect1({
            fade: 'fade-in1'
        })
    }
  }

  function fadeInOut2() {
    if (fadeEffect2.fade === 'fade-out2') {
        setFadeEffect2({
            fade: 'fade-in2'
        })
    } else {
        setFadeEffect2({
            fade: 'fade-out2'
        })
    }
  }

  const urlImages1 = `url('${images1[indexImages]}')`;
  const urlImages2 = `url('${images2[indexImages]}')`;
  if (DEBUG) console.log(`url('${images1[indexImages]}')`);
  if (DEBUG) console.log(`url('${images2[indexImages]}')`);

  return (
    <>
      <div className='backgroundFilter'>
              <div className={fadeEffect2.fade} style={{backgroundImage: urlImages2}}>
                <div className={fadeEffect1.fade} style={{backgroundImage: urlImages1}}>
                </div>
              </div>
      </div>
    </>
  )
}

export default BackgroundImage;