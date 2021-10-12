import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as PetPawLogo } from '../../assets/icons/dogpaw.svg';
import { ReactComponent as NavBackArrow } from '../../assets/icons/navbackarrow.svg';

const styles = {
    logoBox: {
        padding: '25px',
        border: '4px solid white',
        borderRadius: '100%',
        width: '30px',
        height: '30px',
        margin: 'auto',
    },
    logo: {
        fill: 'white',
    },
    navBackText: {
        height: 'fit-content',
        paddingTop: '20px',
        paddingBottom: '20px',
        cursor: 'pointer',
        color: 'white',
        font: '300 15px/1.2 "Poppins", sans-serif',
        textTransform: 'uppercase',
        display: 'flex',
        alignItems: 'center',
    },
    navBackArrow: {
        fill: 'white',
        transform: 'scaleX(-1)',
        width: '18px',
        height: '18px',
        paddingLeft: '10px',
    },
    navBackLink: {
        textDecoration: 'none',
    }
}

const Logo = () => {

    let DEBUG = true;

    return (  
        <div>
            <div>
                <Link style={styles.logo} to='/'>
                    <div style={styles.logoBox} >
                        <PetPawLogo />
                    </div>
                </Link>
            </div>
            <div style={styles.navBack}>
                <Link style={styles.navBackLink} to='/'>
                    <div style={styles.navBackText}>
                        <NavBackArrow style={styles.navBackArrow}/>
                        Back to the List
                    </div>
                </Link>
            </div>
        </div>
    );
}
 
export default Logo;