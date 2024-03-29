import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppStateContext } from '../../contexts/AppStateContext.js';
import { handleError, clearError } from '../../utils/HelperFunctions.js';
import BackgroundImages from './BackgroundImages.js';
import Logo from '../generic/Logo.js';
import PasswordShowHide from './PasswordShowHide.js';
import { ReactComponent as EmailIcon } from '../../assets/icons/email.svg';
import { ReactComponent as UsernameIcon } from '../../assets/icons/username.svg';
import { ReactComponent as PhoneIcon } from '../../assets/icons/phone.svg';

const SignUp = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
	const [phone, setPhone] = useState('');
	const [successMsg, setSuccessMsg] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	const [loading, setLoading] = useState(false);

	const { signUpUser } = useContext(AppStateContext);
	const navigate = useNavigate();

	let disabled = !password || !email || !username || !phone || loading;

	function handleSubmit(event) {
		event.preventDefault();

		if (!disabled) {
			setLoading(true);
			signUpUser({
				email,
				username,
				phone,
				pw: password,
				successCallback: (res) => {
					setErrorMsg('');
					setSuccessMsg(res);
					setLoading(false);
				},
				successTimeout: () =>
					setTimeout(() => {
						setEmail('');
						setUsername('');
						setPhone('');
						setPassword('');
						setSuccessMsg('');
						navigate('/login');
					}, 1500),
				errorCallback: (err) => {
					setLoading(false);
					clearError();
					handleError(err, setErrorMsg);
				},
			});
		}
	}

	return (
		<main className='formMain'>
			<BackgroundImages />
			<section className='signUpContainer'>
				<div className='logoContainer'>
					<Logo />
				</div>
				<div className='signUpFormBox'>
					<h2 className='formHeadline'>Sign Up</h2>
					<div className='loginText'>
						<p>Already have an account?</p>
						<Link className='formLink' to='/login'>
							Login Now
						</Link>
					</div>
					<div className='message'>
						<p className='errorMessage'>{errorMsg}</p>
						<p className='successMessage'>{successMsg}</p>
					</div>
					<form method='POST' onSubmit={handleSubmit}>
						<div className='inputBox'>
							<label className='formLabel' htmlFor='email'>
								<EmailIcon />
							</label>
							<input
								className='formInput'
								type='email'
								name='email'
								placeholder='email'
								value={email}
								required
								onChange={(event) => setEmail(event.target.value)}
							/>
						</div>
						<div className='inputBox'>
							<label className='formLabel' htmlFor='username'>
								<UsernameIcon />
							</label>
							<input
								className='formInput'
								type='text'
								name='username'
								placeholder='username'
								value={username}
								required
								onChange={(event) => setUsername(event.target.value)}
							/>
						</div>
						<div className='inputBox'>
							<label className='formLabel' htmlFor='phone'>
								<PhoneIcon />
							</label>
							<input
								className='formInput'
								type='tel'
								name='phone'
								placeholder='phone'
								value={phone}
								minLength=''
								required
								onChange={(event) => setPhone(event.target.value)}
							/>
						</div>
						<PasswordShowHide password={password} setPassword={setPassword} />
						<div className={password ? 'acceptedPasswordTextActive' : 'acceptedPasswordText'}>
							At least 8 characters, must contain one upper-case and one lower-case letter, one digit and one special character.
						</div>
						<div>
							<button type='submit' className={disabled ? 'formButtonInactive' : 'formButton'} disabled={disabled}>
								SignUp
							</button>
						</div>
					</form>
				</div>
			</section>
		</main>
	);
};

export default SignUp;
