import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as PetPawLogo } from '../assets/icons/dogpaw.svg';
import { AuthContext } from '../contexts/AuthContext';
import { AppStateContext } from '../contexts/AppStateContext';

const Navbar = () => {
    const [errorMsg, setErrorMsg] = useState('');
    const { token, handleLogOut } = useContext(AuthContext);
    const { getUsername, user } = useContext(AppStateContext);

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

    // for Link tag:
    // activeStyle={{color: 'red'}}
    // activeClassName={'active'}

    if (DEBUG) console.log(user);
    
    return (  
        <div>
            <ul className='navbar'>
                { !token ?               
                    <>
                        <li>
                            <Link className='navLogo' to='/'>
                                <PetPawLogo className='navLogoInner'/>
                            </Link>
                        </li>
                        <ul className='navPositionRight'> 
                            <li>
                                <Link className='navLink' to='/lostandfound'>Lost & Found</Link>
                            </li>
                            <li>
                                <Link className='navLink' disabled>Report Pet</Link>
                            </li>
                            <li>
                                <Link className='navLink' to='/login'>Login</Link>
                            </li>
                            <li>
                                <Link className='navLink' to='/register'>Register</Link>
                            </li>
                        </ul>
                    </>
                    : 
                    <>
                        <ul className='navPositionLeft'>
                            <li>
                                <Link className='navLogo' to='/'>
                                    <PetPawLogo className='navLogoInner'/>
                                </Link>
                            </li>
                            <li className='username'>Hi {user}!</li>
                        </ul>
                        <ul className='navPositionRight'>
                            <li>
                                <Link className='navLink' to='/lostandfound'>Lost & Found</Link>
                            </li>
                            <li>
                                <Link className='navLink' to='/reportpet'>Report Pet</Link>
                            </li>
                            <li>
                                <button className='logOutButton' onClick={() => handleLogOut()}>Log Out</button>
                            </li>
                        </ul>
                    </>
                }     
            </ul>
            <div className='message'>
                <p className='errorMessage'>{errorMsg}</p>
            </div>
        </div>
    );
}
 
export default Navbar;