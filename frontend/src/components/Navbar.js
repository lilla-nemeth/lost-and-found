import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
    navbar: {
        listStyleType: 'none',
        margin: 0,
        padding: '22px 0',
        background: '#333',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'flex-end',
    },
    navbarElement: {
        textAlign: 'center',
        padding: '14px 18px',
        margin: '4px',
        textDecoration: 'none',
        border: '1px solid white',
        color: 'white',
        font: '300 15px/1.2 "Poppins", sans-serif',
    },
}

const Navbar = () => {

    return (  
        <div>
            <ul style={styles.navbar}>
                <li><Link style={styles.navbarElement} className='navLink' to='/'>Logo</Link></li>
                <li><Link style={styles.navbarElement} className='navLink' to='/'>Lost & Found</Link></li>
                <li><Link style={styles.navbarElement} className='navLink' to='/reportpet'>Report Pet</Link></li>
                <li><Link style={styles.navbarElement} className='navLink' to='/login'>Login</Link></li>
            </ul>
        </div>
    );
}
 
export default Navbar;