import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as PetPawLogo } from '../assets/icons/dogpaw.svg';
import { AuthContext } from '../contexts/AuthContext';

const styles = {
    navbarContainer: {
        background: '#B0F0EB', 
        height: '100px'
    },
    navbar: {
        listStyleType: 'none',
        background: '#226660',
        overflow: 'hidden',
        boxShadow: '7px 12px 24px -8px rgba(0,0,0,0.40)',
        position: 'fixed',
        width: '100%',
        zIndex: 100,
        display: 'flex'
    },
    pawIcon: {
        height: '20px',
    }
}

const Navbar = () => {
    const { token, handleLogOut } = useContext(AuthContext);

    let DEBUG = true;
    
    // if (DEBUG) console.log('navbar props',handleLogOut)
    
    return (  
        <div style={styles.navbarContainer}>
            <ul style={styles.navbar}>
                    <li><Link className='navLogo' to='/'><PetPawLogo className='navLogoInner'/></Link></li>
                    <li><Link className='navLink' to='/'>Lost & Found</Link></li>
                    <li><Link className='navLink' to='/reportpet'>Report Pet</Link></li>
                    { !token ?               
                    <>
                        <li><Link className='navLink' to='/login'>Login</Link></li>
                        <li><Link className='navLink' to='/register'>Register</Link></li>
                    </>
                    : <li><button className='logOutButton' onClick={() => handleLogOut()}>Log Out</button></li>
                }
                    
            </ul>
        </div>
    );
}
 
export default Navbar;