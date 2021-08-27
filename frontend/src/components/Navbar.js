import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as PetPawLogo } from '../assets/icons/dogpaw.svg';

const styles = {
    navbarContainer: {
        background: '#B0F0EB', 
        height: '100px'
    },
    navbar: {
        listStyleType: 'none',
        // padding: '20px 0',
        background: '#226660',
        overflow: 'hidden',
        boxShadow: '7px 12px 24px -8px rgba(0,0,0,0.40)',
        position: 'fixed',
        width: '100%',
        zIndex: 100,
        display: 'flex'
    },
    navbarElement: {
        textAlign: 'center',
        padding: '14px 18px',
        margin: '4px',
        textDecoration: 'none',
        color: 'white',
        font: '300 15px/1.2 "Poppins", sans-serif',
        display: 'flex',
    },
    pawIcon: {
        // width: '20px',
        height: '20px',
    }
}

const Navbar = () => {

    return (  
        <div style={styles.navbarContainer}>
            <ul style={styles.navbar}>
                    <li><Link style={styles.navbarElement} to='/'><PetPawLogo style={styles.pawIcon}/></Link></li>
                    <li><Link style={styles.navbarElement} className='navLink' to='/'>Lost & Found</Link></li>
                    <li><Link style={styles.navbarElement} className='navLink' to='/reportpet'>Report Pet</Link></li>
                    <li><Link style={styles.navbarElement} className='navLink' to='/login'>Login</Link></li>
            </ul>
        </div>
    );
}
 
export default Navbar;