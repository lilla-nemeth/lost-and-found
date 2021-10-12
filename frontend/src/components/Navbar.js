import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as PetPawLogo } from '../assets/icons/dogpaw.svg';
import { AuthContext } from '../contexts/AuthContext';
import { AppStateContext } from '../contexts/AppStateContext';

const styles = {
    navbar: {
        listStyleType: 'none',
        background: '#226660',
        overflow: 'hidden',
        boxShadow: '7px 12px 24px -8px rgba(0,0,0,0.40)',
        position: 'fixed',
        width: '100%',
        zIndex: 100,
        display: 'flex',
        justifyContent: 'space-between',
    },
    pawIcon: {
        height: '20px',
    }
}

const Navbar = () => {
    const [errorMsg, setErrorMsg] = useState('');
    const { token, handleLogOut } = useContext(AuthContext);
    const { getUsername, user } = useContext(AppStateContext);


    let DEBUG = true;
    
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
    
    return (  
        <div style={styles.navbarContainer}>
            <ul style={styles.navbar}>
                    { !token ?               
                    <>
                        <li><Link className='navLogo' to='/'><PetPawLogo className='navLogoInner'/></Link></li>
                        <ul style={{display: 'flex', textAlign: 'right'}}> 
                            <li><Link className='navLink' to='/lostandfound'>Lost & Found</Link></li>
                            <li><Link className='navLink' to='/reportpet' disabled>Report Pet</Link></li>
                            <li><Link className='navLink' to='/login'>Login</Link></li>
                            <li><Link className='navLink' to='/register'>Register</Link></li>
                        </ul>
                    </>
                    : 
                    <>
                        <ul style={{display: 'flex', alignContent: 'flex-start'}}>
                            <li><Link className='navLogo' to='/'><PetPawLogo className='navLogoInner'/></Link></li>
                            <li className='username'>Hi {user}!</li>
                        </ul>
                        <ul style={{display: 'flex', textAlign: 'right'}}>
                            <li><Link className='navLink' to='/lostandfound'>Lost & Found</Link></li>
                            <li><Link className='navLink' to='/reportpet'>Report Pet</Link></li>
                            <li><button className='logOutButton' onClick={() => handleLogOut()}>Log Out</button></li>
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