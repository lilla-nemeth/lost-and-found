import React, { useEffect, useState } from 'react';


const BackgroundFade = () => {

  const [fadeEffect, setFadeEffect] = useState({
      fade: 'fade-out',
    // fade: 'fade-in'
  });
  
  let DEBUG = true;

  useEffect(() => {
    const interval = setInterval(() => {
      fadeInOut();
      }, 1000);
      if (interval) {
        return () => clearInterval(interval);
    }
  }, [fadeEffect]);

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

  return (
    <>
        <div className={fadeEffect.fade}>
        </div>
    </>
  )
}

export default BackgroundFade;