import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as EmailIcon } from '../assets/icons/email.svg';
import { ReactComponent as PasswordIcon } from '../assets/icons/password.svg';
import BackgroundImage from './BackgroundImage';
import Logo from './Logo';

const styles = {
    formBox: {
        // background: 'rgba(255,255,255,0.9)', 
        background: 'rgba(255,255,255)', 
        padding: '50px', 
        height: 'fit-content',
        borderRadius: '25px', 
        boxShadow: '7px 12px 24px -8px rgba(0,0,0,0.40)',
    }, 
    emailBox: {
        display: 'flex',
    },
    passwordBox: {
        paddingTop: '20px',
        display: 'flex',
    },
    signUpText: {
        paddingBottom: '40px',
        font: '400 15px / 1.2 Poppins, sans-serif',
        display: 'flex',
        // textAlign: 'center',
    },
    container: {
        // textAlign: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: '"Poppins", sans-serif',
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%',
        alignItems: 'center'
    },
    logoContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    h2: {
        font: '500 30px/1.2 "Poppins", sans-serif',
        paddingBottom: '30px',
        color: '#226660',
    }
}

const Login = () => {
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');

    let DEBUG = true;
    
    return (  
        <div>
            <BackgroundImage />
            <div style={styles.container}>
                <div style={styles.logoContainer}>
                    <Logo />
                </div>
                <div style={styles.formBox}>
                        <h2 style={styles.h2}>Login</h2>
                        <div style={styles.signUpText}>
                            <p style={{paddingBottom: '10px'}}>Don't have an account?</p>
                            <Link className='formLink' to='/register'>Sign Up Now</Link>
                        </div>
                        <form method='POST' 
                            //   onSubmit={handleSubmit}
                        >
                            <div style={styles.emailBox}>
                                <label className='formLabel' for='email'>
                                    <EmailIcon />
                                </label>
                                <input 
                                    className='formInput' 
                                    autocomplete='email' 
                                    type='email' 
                                    name='email' 
                                    placeholder='email' 
                                    required 
                                    onChange={event => setEmail(event.target.value)}
                                />
                            </div>
                            <div style={styles.passwordBox}>
                                <label className='formLabel' for='password'>
                                    <PasswordIcon />
                                </label>
                                <input 
                                    className='formInput'
                                    autocomplete='password' 
                                    type='password' 
                                    name='password' 
                                    placeholder='password' 
                                    required 
                                    onChange={event => setPw(event.target.value)}
                                />
                            </div>
                            <div>
                                <button className='formButton'>Login</button>
                            </div>
                        </form>
                    </div>
            </div>      
        </div>
    );
}
 
export default Login;