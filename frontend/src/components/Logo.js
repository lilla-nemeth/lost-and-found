import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as PetPawLogo } from '../assets/icons/dogpaw.svg';
import { ReactComponent as NavBackArrow } from '../assets/icons/navbackarrow.svg';

const styles = {
    logoBox: {
        padding: '30px',
        border: '5px solid white',
        borderRadius: '100%',
    },
    logo: {
        fill: 'white'
    },
    // navBack: {
    //     display: 'flex',
    //     flexDirection: 'column',
    //     justifyContent: 'center',
    // },
    navBackButton: {
        height: 'fit-content',
        paddingTop: '20px',
        paddingBottom: '20px',
        cursor: 'pointer',
        background: 'none',
        border: 'none',
        color: 'white',
        font: '300 15px/1.2 "Poppins", sans-serif',
        textTransform: 'uppercase',
    },
}

const Logo = () => {

    let DEBUG = true;

    return (  
        <div>
                <Link style={styles.logo} to='/'>
            <div style={styles.logoBox} >
                    <PetPawLogo />
            </div>
                </Link>
            <div style={styles.navBack}>
                <Link to='/'>
                    <NavBackArrow /><button style={styles.navBackButton}>Back to Search</button>
                </Link>
            </div>
        </div>
    );
}
 
export default Logo;