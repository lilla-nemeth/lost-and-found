import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as EmailIcon } from '../assets/icons/email.svg';
import { ReactComponent as PasswordIcon } from '../assets/icons/password.svg';

const styles = {
    main: {
        fontFamily: '"Poppins", sans-serif',
        background: '#B0F0EB',
        overflow: 'hidden'
    },
    section: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100vh',
    },
    formBox: {
        background: 'rgba(255,255,255,0.7)', 
        marginBottom: '13px', 
        // padding: '25px', 
        padding: '50px', 
        height: 'fit-content',
        borderRadius: '25px', 
        boxShadow: '7px 12px 24px -8px rgba(0,0,0,0.40)'
    }, 
    emailBox: {
        display: 'flex',
    },
    passwordBox: {
        paddingTop: '20px',
        display: 'flex',
    },
    formLabel: {
        padding: '16px',
        background: '#47a39c',
        width: 'fit-content',
        fill: '#226660',
        borderRadius: '0.25rem 0 0 0.25rem',
        // fill: '#fff',
        // fill: '#B0F0EB',
    },
    signUpText: {
        paddingTop: '20px',
        textAlign: 'center',
    }
}

const Login = () => {
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');

    let DEBUG = true;
    
    return (    
        <main style={styles.main}>    
            <section style={styles.section}>
                <div style={styles.formBox}>
                    <form method='POST' 
                        //   onSubmit={handleSubmit}
                    >
                        <div style={styles.emailBox}>
                            <label style={styles.formLabel} for='email'>
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
                            <label style={styles.formLabel} for='password'>
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
                    <div style={styles.signUpText}>
                        <p style={{paddingBottom: '20px'}}>Don't have an account?</p>
                        <Link className='formLink' to='/register'>Sign Up Now</Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
 
export default Login;