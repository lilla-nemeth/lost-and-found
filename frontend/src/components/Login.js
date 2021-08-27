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
        padding: '25px', 
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
        // fill: '#fff',
        // fill: '#B0F0EB',
    },
    formInput: {
        padding: '16px',
        width: '300px',
        background: '#b7dfdb',
        border: 'none',
        font: '300 15px/1.2 "Poppins", sans-serif',
    },
    signUpText: {
        paddingTop: '20px',
        textAlign: 'center',
    }
}

const Login = () => {
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    // error message
    // success message

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (    
        <main style={styles.main}>    
            <section style={styles.section}>
                <div style={styles.formBox}>
                    <form method='POST' onSubmit={handleSubmit}>
                        <div style={styles.emailBox}>
                            <label style={styles.formLabel} for='email'>
                                <EmailIcon />
                            </label>
                            <input 
                                style={styles.formInput} 
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
                                style={styles.formInput} 
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