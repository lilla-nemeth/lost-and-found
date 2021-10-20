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

    function returnUnprotectedNavLinks(className) {
        return (
            <>
                <li className='navList'><Link className={className} to='/lostandfound' onClick={() => setHamburgerOpen(!hamburgerOpen)}>Lost & Found</Link></li>
                <li className='navList'><Link className={className} to='' disabled>Report Pet</Link></li>
                <li className='navList'><Link className={className} to='/login' onClick={() => setHamburgerOpen(!hamburgerOpen)}>Login</Link></li>
                <li className='navList'><Link className={className} to='/register' onClick={() => setHamburgerOpen(!hamburgerOpen)}>Register</Link></li>     
            </>
        )
    }

    function returnProtectedNavLinks(className, buttonClassName) {
        return (
            <>
                <li><Link className={className} to='/lostandfound' onClick={() => setHamburgerOpen(!hamburgerOpen)}>Lost & Found</Link></li>
                <li><Link className={className} to='/reportpet' onClick={() => setHamburgerOpen(!hamburgerOpen)}>Report Pet</Link></li>
                <li><button className={buttonClassName} onClick={() => {handleLogOut(); setHamburgerOpen(!hamburgerOpen)}}>Log Out</button></li>  
            </>
        )
    }

    function isNavbarOpen(isOpen) {
        if (isOpen) {
            return (
                <>
                    <ul className='navMainList' style={{display: 'none'}}>
                        {returnProtectedNavLinks('navLinkDesktop', 'logOutButtonDesktop')}
                    </ul>
                    <ul className='navMainListMobile' style={{display: 'flex'}}>
                        {returnProtectedNavLinks('navLinkMobile', 'logOutButtonMobile')}
                    </ul>
                </>
            )
        } else {
            return (
                <>
                    <ul className='navMainList' style={{display: 'flex'}}>
                        {returnProtectedNavLinks('navLinkDesktop', 'logOutButtonDesktop')}
                    </ul>
                    <ul className='navMainListMobile' style={{display: 'none'}}>
                        {returnProtectedNavLinks('navLinkMobile', 'logOutButtonMobile')}
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
                            {isNavbarOpen(hamburgerOpen)}
                    </>
                    :
                    <>
                        <div className='navPositionLeft'>
                            <Link className='navLogo' to='/'><PetPawLogo className='navLogoInner'/></Link>
                            <li className='username'>Hi {username}!</li>
                        </div>
                            {/* <ul className='navPositionRight'>
                            </ul>  */}
                            {isNavbarOpen(hamburgerOpen)}
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