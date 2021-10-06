import React from 'react';
import Video from '../../assets/video/dogvideo.mp4';

const PetLandingPage = () => {

    let DEBUG = true;

    return (
        <div>
            <div className='landingPageBox'>
                 <h1 className='landingPageHeadline'>Find Your<br/>Lost Pet</h1>
                <video className='landingPageVideo' autoPlay loop muted>
                    <source src={Video} type='video/mp4'/>
                </video>
            </div>
        </div>
    );
}
 
export default PetLandingPage;