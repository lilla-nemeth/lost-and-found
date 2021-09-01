import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as EmailIcon } from '../assets/icons/email.svg';
import { ReactComponent as UsernameIcon } from '../assets/icons/username.svg';
import { ReactComponent as PasswordIcon } from '../assets/icons/password.svg';
import { ReactComponent as PhoneIcon } from '../assets/icons/phone.svg';
import { ApiContext } from '../contexts/ApiContext';
import createHistory from 'history/createBrowserHistory';

const styles = {
    main: {
        fontFamily: '"Poppins", sans-serif',
        background: '#B0F0EB',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'flex-end',
    },
    section: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        width: 'fit-content',
        height: '100vh',
        margin: '25px 100px',
    },
    formBox: {
        background: 'rgba(255,255,255,0.7)', 
        padding: '50px', 
        height: 'fit-content',
        borderRadius: '25px', 
        boxShadow: '7px 12px 24px -8px rgba(0,0,0,0.40)',
    }, 
    emailBox: {
        display: 'flex',
    },
    usernameBox: {
        paddingTop: '20px',
        display: 'flex',
    },
    passwordBox: {
        paddingTop: '20px',
        display: 'flex',
    },
    signUpText: {
        paddingTop: '20px',
        textAlign: 'center',
    },
    errorMessage: {
        paddingTop: '20px',
        textAlign: 'center',
        color: 'red'
    },
    successMessage: {
        paddingTop: '20px',
        textAlign: 'center',
        color: 'green'
    },
    backButton: {
        height: 'fit-content',
        padding: '30px',
        cursor: 'pointer',
    },
}

const Register = () => {
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const { registerUser } = useContext(ApiContext);

    let DEBUG = true;

    function handleSubmit(event) {
        event.preventDefault();

        registerUser({
            email,
            pw,
            username,
            phone,
            success: res => setSuccessMsg(res),
            successTimeout: () => (setTimeout(() => {
                setSuccessMsg('');
            }, 5000)),
            error: err => setErrorMsg(err),
            errorTimeout: () => (setTimeout(() => {
                setErrorMsg('');
            }, 5000))
        })
    }
    
    createHistory().replace('/register');

    return (
        <main style={styles.main}>  
            <Link to='/'>
                <button style={styles.backButton}>
                    Back to the Lost & Found Page
                </button>
            </Link>  
            <section style={styles.section}>
                <div style={styles.formBox}>
                    <form onSubmit={handleSubmit}>
                        <div style={styles.emailBox}>
                            <label className='formLabel'  for='email'>
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
                        <div style={styles.usernameBox}>
                            <label className='formLabel'  for='email'>
                                <UsernameIcon />
                            </label>
                            <input 
                                className='formInput'
                                autocomplete='username' 
                                type='text' 
                                name='username' 
                                placeholder='username' 
                                required 
                                onChange={event => setUsername(event.target.value)}
                            />
                        </div>
                        <div style={styles.usernameBox}>
                            <label className='formLabel'  for='email'>
                                <PhoneIcon />
                            </label>
                            <input 
                                className='formInput'
                                autocomplete='phone' 
                                type='number' 
                                name='phone' 
                                placeholder='phone' 
                                required 
                                onChange={event => setPhone(event.target.value)}
                            />
                        </div>
                        <div style={styles.passwordBox}>
                            <label className='formLabel'  for='password'>
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
                            <button className='formButton'>Register</button>
                        </div>
                        <div style={styles.signUpText}>
                            <p style={{paddingBottom: '20px'}}>Already have an account?</p>
                            <Link className='formLink' to='/login'>Login Now</Link>
                        </div>
                        <div style={styles.errorMessage}>
                            <p>{errorMsg}</p>
                        </div>
                        <div style={styles.successMessage}>
                            <p>{successMsg}</p>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}
 
export default Register;