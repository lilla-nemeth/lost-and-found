import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import BackgroundImages from './BackgroundImages';
import createHistory from 'history/createBrowserHistory';
import { ReactComponent as EmailIcon } from '../assets/icons/email.svg';
import { ReactComponent as PasswordIcon } from '../assets/icons/password.svg';
import { ApiContext } from '../contexts/ApiContext';
import Logo from './Logo';

const Login = () => {
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const { loginUser } = useContext(ApiContext);

    let DEBUG = true;
    
    function handleSubmit(event) {
        event.preventDefault();

        // console.log(loginUser({email, pw}));
        // loginUser();
        if (DEBUG) console.log(loginUser({email: '!emailaddress', pw: '!passwordText'}))
    }

    createHistory().replace('/login');


    // DON'T FORGET TO PUT HERE THE SUCCESS/ERROR MESSAGES PART

    return (  
        <main>
            <BackgroundImages />
            <section className='container'>
                <div className='logoContainer'>
                    <Logo />
                </div>
                <div className='formBox'>
                        <h2 className='formHeadline'>Login</h2>
                        <div className='signUpText'>
                            <p>Don't have an account?</p>
                            <Link className='formLink' to='/register'>Sign Up Now</Link>
                        </div>
                        <div className='message'>
                            <p className='errorMessage'>{errorMsg}</p>
                            <p className='successMessage'>{successMsg}</p>
                        </div>
                        <form method='POST' 
                              onSubmit={handleSubmit}
                        >
                            <div className='emailBox'>
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
                            <div className='passwordBox' >
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
            </section>      
        </main>
    );
}
 
export default Login;