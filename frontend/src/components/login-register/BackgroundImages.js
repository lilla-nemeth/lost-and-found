import React, { useEffect, useState } from 'react';
import '../../style/App.css';
import img01 from '../../assets/images/01backgroundImg.jpg';
import img02 from '../../assets/images/02backgroundImg.jpg';
import img03 from '../../assets/images/03backgroundImg.jpg';
import img04 from '../../assets/images/04backgroundImg.jpg';
import img05 from '../../assets/images/05backgroundImg.jpg';
import img06 from '../../assets/images/06backgroundImg.jpg';
import img07 from '../../assets/images/07backgroundImg.jpg';

const BackgroundImage = () => {
    const [fadeIn, setFadeIn] = useState({ 
      fade: 'fade-in' 
    });
    const [fadeOut, setFadeOut] = useState({ 
      fade: 'fade-out' 
    });   
    const [images1, setImages1] = useState([
      img01, 
      img02, 
      img02, 
      img03, 
      img03, 
      img04, 
      img04, 
      img05, 
      img05, 
      img06, 
      img06, 
      img07, 
      img07, 
      img01
    ]);
    const [images2, setImages2] = useState([
      img01, 
      img01, 
      img02, 
      img02, 
      img03, 
      img03, 
      img04, 
      img04, 
      img05, 
      img05, 
      img06, 
      img06, 
      img07, 
      img07, 
      img01
    ]);
    const [indexImages, setIndexImages] = useState(0);

    let DEBUG = false;

    useEffect(() => {
      const imagesInterval = setInterval(() => {
        changeImagesIndex(images2);
        changeImagesIndex(images1);
        changeFadeOut();
        changeFadeIn();
        }, 7000);
        if (imagesInterval) {
          return () => clearInterval(imagesInterval);
      }
    }, [images1, images2, fadeIn, fadeOut, changeImagesIndex, changeFadeIn, changeFadeOut]);


    function changeImagesIndex(arr) {
      const numberOfImages = arr.length;
        if (indexImages === numberOfImages - 1) {
          return setIndexImages(0);
        } else {
          return setIndexImages(indexImages + 1);
        }
    }

    function changeFadeIn() {
      if (fadeIn.fade === 'fade-in') {
          setFadeIn({
              fade: 'fade-out'
          })
      } else {
          setFadeIn({
              fade: 'fade-in'
          })
      }
    }

    function changeFadeOut() {
      if (fadeOut.fade === 'fade-out') {
          setFadeOut({
              fade: 'fade-out'
          })
      } else {
          setFadeOut({
              fade: 'fade-out'
          })
      }
    }

    const urlImages1 = `url('${images1[indexImages]}')`;
    const urlImages2 = `url('${images2[indexImages]}')`;

    return (
      <>
        <div className='backgroundFilter'>
            <div className={fadeOut.fade} style={{backgroundImage: urlImages2}}>
              <div className={fadeIn.fade} style={{backgroundImage: urlImages1}}>
              </div>
            </div>
        </div>
      </>
    )
}

export default BackgroundImage;