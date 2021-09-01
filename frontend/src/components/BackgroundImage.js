import React from 'react';
import img from '../assets/images/01backgroundImg.jpg';

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

const BackgroundImage = () => {

    // let DEBUG = true;

    return (  
        <>
            <div style={styles.filter}>
                <div style={styles.backgroundContainer}>
                    <img src={img} alt='img'/> 
                </div> 
            </div>
        </>
    );
}
 
export default BackgroundImage;