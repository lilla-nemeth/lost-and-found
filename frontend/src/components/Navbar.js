import React, { useContext, useEffect, useState } from 'react';
import { ReactComponent as PetPawLogo } from '../assets/icons/dogpaw.svg';
import { AuthContext } from '../contexts/AuthContext';
import { AppStateContext } from '../contexts/AppStateContext';
import Hamburger from './Hamburger';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [errorMsg, setErrorMsg] = useState('');
    const [hamburgerOpen, setHamburgerOpen] = useState(false);
    
    const { token, handleLogOut } = useContext(AuthContext);
    const { getUsername, username } = useContext(AppStateContext);

    let DEBUG = false;
    
    useEffect(() => {
            getUsername({
                token,
                errorCallback: err => setErrorMsg(err),
                errorTimeout: () => (setTimeout(() => {
                   setErrorMsg('');
                }, 5000))
            })
    },[token]);

    if (DEBUG) console.log('USERNAME NAVBAR', username);

    function returnUnprotectedNavLinks() {
        return (
            <>
                <li className='navList'><Link className='navLink' to='/lostandfound' onClick={() => setHamburgerOpen(!hamburgerOpen)}>Lost & Found</Link></li>
                <li className='navList'><Link className='navLink' to='' disabled>Report Pet</Link></li>
                <li className='navList'><Link className='navLink' to='/login' onClick={() => setHamburgerOpen(!hamburgerOpen)}>Login</Link></li>
                <li className='navList'><Link className='navLink' to='/register' onClick={() => setHamburgerOpen(!hamburgerOpen)}>Register</Link></li>     
            </>
        )
    }

    function returnProtectedNavLinks() {
        return (
            <>
                <li><Link className='navLink' to='/lostandfound' onClick={() => setHamburgerOpen(!hamburgerOpen)}>Lost & Found</Link></li>
                <li><Link className='navLink' to='/reportpet' onClick={() => setHamburgerOpen(!hamburgerOpen)}>Report Pet</Link></li>
                <li><button className='logOutButton' onClick={() => {handleLogOut(); setHamburgerOpen(!hamburgerOpen)}}>Log Out</button></li>  
            </>
        )
    }

    function isNavbarOpen(isOpen, listFunction) {
        if (isOpen) {
            return (
                <>
                    <ul className='navMainListMobile' style={{display: 'flex'}}>
                        {listFunction}
                    </ul>
                </>
            )
        } else {
            return (
                <>
                    <ul className='navMainListMobile' style={{display: 'none'}}>
                        {listFunction}
                    </ul>
                </>
            )
        }
    }

    return (  
        <div>
            <div className='navigation'>
                {!token ?
                    <>
                        <Link className='navLogo' to='/'><PetPawLogo className='navLogoInner'/></Link>
                        <ul className='navMainList'>
                            {returnUnprotectedNavLinks()}
                        </ul>
                            {isNavbarOpen(hamburgerOpen, returnUnprotectedNavLinks())}
                    </>
                    :
                    <>
                        <div className='navPositionLeft'>
                            <Link className='navLogo' to='/'><PetPawLogo className='navLogoInner'/></Link>
                            <li className='username'>Hi {username}!</li>
                        </div>
                        <div className='navMainList'>
                            <ul className='navPositionRight'>
                                {returnProtectedNavLinks()}
                            </ul>
                        </div>
                            {isNavbarOpen(hamburgerOpen, returnProtectedNavLinks())}
                    </>
                }
                <div className="hamburger" onClick={() => setHamburgerOpen(!hamburgerOpen)}>
                    <Hamburger hamburgerOpen={hamburgerOpen}/>
                </div>
            </div>
            <div className='message'>
                <p className='errorMessage'>{errorMsg}</p>
            </div>
        </div>
    );
}
 
export default Navbar;