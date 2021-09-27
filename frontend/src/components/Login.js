import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ApiContext } from '../contexts/ApiContext';
import createHistory from 'history/createBrowserHistory';
import Logo from './Logo';
import BackgroundImages from './BackgroundImages';
import PasswordShowHide from './PasswordShowHide';
import { ReactComponent as EmailIcon } from '../assets/icons/email.svg';

const Login = () => {
    const [email, setEmail] = useState('');
    const [pwValues, setPwValues] = useState({
        pw: '',
        showPassword: false,
    });
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    let DEBUG = true;

    // const { token, setToken, handleLogOut } = useContext(AuthContext);
    const { loginUser } = useContext(ApiContext);


    // if (DEBUG) console.log(token, setToken)
    


    function handleSubmit(event) {
            event.preventDefault();
    
            loginUser({
                email,
                pw: pwValues.pw,
                errorCallback: err => setErrorMsg(err),
                errorTimeout: () => (setTimeout(() => {
                    setErrorMsg('');
                }, 5000))
            });
        
        // if (DEBUG) console.log(loginUser(email, pw));
    }

    createHistory().replace('/login');


    // if (DEBUG) console.log('PASSWORDVALUES', pwValues.pw);

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
                            <div className='inputBox'>
                                <label className='formLabel' for='email'>
                                    <EmailIcon />
                                </label>
                                <input 
                                    className='formInput' 
                                    autoComplete='email' 
                                    type='email' 
                                    name='email' 
                                    placeholder='email' 
                                    required 
                                    onChange={event => setEmail(event.target.value)}
                                />
                            </div>
                            <PasswordShowHide pwValues={pwValues} setPwValues={setPwValues} />
                            <div>
                                <button type='submit' className='formButton'>Login</button>
                            </div>
                        </form>
                    </div>
            </section>      
        </main>
    );
}
 
export default Login;