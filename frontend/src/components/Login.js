import React, { useState } from 'react';
import BackgroundImages from './BackgroundImages';
import { Link } from 'react-router-dom';
import { ReactComponent as EmailIcon } from '../assets/icons/email.svg';
import { ReactComponent as PasswordIcon } from '../assets/icons/password.svg';
import Logo from './Logo';

const Login = () => {
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');

    let DEBUG = true;
    
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
                        <form method='POST' 
                            //   onSubmit={handleSubmit}
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