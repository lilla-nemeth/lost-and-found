import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ApiContext } from '../../contexts/ApiContext';
import createHistory from 'history/createBrowserHistory';
import Logo from './Logo';
import BackgroundImages from './BackgroundImages';
import PasswordShowHide from './PasswordShowHide';
import { ReactComponent as EmailIcon } from '../../assets/icons/email.svg';
import { AuthContext } from '../../contexts/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    let DEBUG = true;

    const { setToken } = useContext(AuthContext);
    const { loginUser } = useContext(ApiContext);

    // if (DEBUG) console.log(token, setToken)

    function handleSubmit(event) {
            event.preventDefault();
    
            loginUser({
                setToken,
                email,
                pw: password,
                errorCallback: err => setErrorMsg(err),
                errorTimeout: () => (setTimeout(() => {
                    setErrorMsg('');
                }, 5000))
            });
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
                                    type='email' 
                                    name='email' 
                                    placeholder='email'
                                    value={email}
                                    required 
                                    onChange={event => setEmail(event.target.value)}
                                />
                            </div>
                            <PasswordShowHide password={password} setPassword={setPassword} />
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