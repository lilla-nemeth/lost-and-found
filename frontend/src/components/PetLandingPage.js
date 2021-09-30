import React from 'react';
import Video from '../assets/video/dogvideo.mp4';

const PetLandingPage = () => {

    let DEBUG = true;

    return (
        <>
            <div className='landingPageHeadline'>
                 <h1>Find Your Lost Pet</h1>
            </div>
            <div>
               <video className='landingPageVideo' autoPlay loop muted>
                   <source src={Video} type='video/mp4'/>
               </video>
           </div>
        </>
    );
}
 
export default PetLandingPage;