import React, { useContext, useEffect, useState } from 'react';
import { ReactComponent as PetPawLogo } from '../../assets/icons/dogpaw.svg';
import { AuthContext } from '../../contexts/AuthContext';
import { AppStateContext } from '../../contexts/AppStateContext';
import Hamburger from './Hamburger';
import { Link } from 'react-router-dom';
import Modal from './Modal';

const Navbar = (props) => {
    const { transparent } = props;

    const { token, handleLogOut } = useContext(AuthContext);
    const { username } = useContext(AppStateContext);

    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    let DEBUG = false;

    function returnUnprotectedLinks(className) {
        return (
            <>
                <li className='navList'>
                    <Link 
                        className={className} 
                        to='/lostandfound' 
                        onClick={() => setHamburgerOpen(!hamburgerOpen)}
                    >
                        Lost & Found
                    </Link>
                </li>
                <Modal className={className} />
                <li className='navList'>
                    <Link 
                        className={className} 
                        to='/login' 
                        onClick={() => setHamburgerOpen(!hamburgerOpen)}
                    >
                        Login
                    </Link>
                </li>
                <li className='navList'>
                    <Link 
                        className={className} 
                        to='/register' 
                        onClick={() => setHamburgerOpen(!hamburgerOpen)}
                    >
                        Register
                    </Link>
                </li>     
            </>
        )
    }

    function returnProtectedLinks(className, buttonClassName) {
        return (
            <>
                <li>
                    <Link 
                        className={className} 
                        to='/lostandfound' 
                        onClick={() => setHamburgerOpen(!hamburgerOpen)}
                    >
                        Lost & Found
                    </Link>
                </li>
                <li>
                    <Link 
                        className={className} 
                        to='/reportpet' 
                        onClick={() => setHamburgerOpen(!hamburgerOpen)}
                    >
                        Report Pet
                    </Link>
                    </li>
                <li>
                    <Link 
                        className={className} 
                        to='/dashboard' 
                        onClick={() => setHamburgerOpen(!hamburgerOpen)}
                    >
                        Dashboard
                    </Link>
                    </li>
                <li>
                    <button 
                        className={buttonClassName} 
                        onClick={() => {handleLogOut(); setHamburgerOpen(!hamburgerOpen)}}
                    >
                        Log Out
                    </button>
                </li>  
            </>
        )
    }

    function handleNavbarStatus(
        isOpen, 
        setNavDesktop, 
        setNavMobile, 
        navStyle, 
        logOutStyle
    ) {
        if (isOpen) {
            return (
                <>
                    <ul 
                        className='navMainList' 
                        style={{display: 'none'}}
                    >
                        {setNavDesktop(navStyle, logOutStyle)}
                    </ul>
                    <ul 
                        className='navMainListMobile' 
                        style={{display: 'flex'}}
                    >
                        {setNavMobile(navStyle, logOutStyle)}
                    </ul>
                </>
            )
        } 
        else {
            return (
                <>
                    <ul 
                        className='navMainList' 
                        style={{display: 'flex'}}
                    >
                        {setNavDesktop(navStyle, logOutStyle)}
                    </ul>
                    <ul 
                        className='navMainListMobile' 
                        style={{display: 'none'}}
                    >
                        {setNavMobile(navStyle, logOutStyle)}
                    </ul>
                </>
            )
        }
    }

    return (  
        <div>
            <div className={transparent ? 'navigationWithoutPicture' : 'navigationWithPicture'}>
                {!token ?
                    <>
                        <Link 
                            className='navLogo' 
                            to='/' 
                            onClick={() => setHamburgerOpen(!hamburgerOpen)}
                        >
                            <PetPawLogo className='navLogoInner'/>
                        </Link>
                            {handleNavbarStatus(hamburgerOpen, 
                                () => returnUnprotectedLinks('navLinkDesktop', 'logOutButtonDesktop'),
                                () => returnUnprotectedLinks('navLinkMobile', 'logOutButtonMobile')
                            )}
                    </>
                    :
                    <>
                        <div className='navPositionLeft'>
                            <Link 
                                className='navLogo' 
                                to='/lostandfound' 
                                onClick={() => setHamburgerOpen(!hamburgerOpen)}
                            >
                                <PetPawLogo className='navLogoInner'/>
                            </Link>
                            <li className='username'>Hi {username}!</li>
                        </div>
                            {handleNavbarStatus(hamburgerOpen, 
                                () => returnProtectedLinks('navLinkDesktop', 'logOutButtonDesktop'),
                                () => returnProtectedLinks('navLinkMobile', 'logOutButtonMobile')
                            )}
                    </>
                }
                <div 
                    className="hamburger" 
                    onClick={() => setHamburgerOpen(!hamburgerOpen)}
                >
                    <Hamburger hamburgerOpen={hamburgerOpen}/>
                </div>
            </div>
        </div>
    );
}
 
export default Navbar;