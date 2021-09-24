
import React, { useState } from 'react';
import { ReactComponent as PasswordIcon } from '../assets/icons/password.svg';
import { ReactComponent as HidePasswordIcon } from '../assets/icons/hidepassword.svg';
import { ReactComponent as ShowPasswordIcon } from '../assets/icons/showpassword.svg';

const PasswordShowHide = (props) => {
    const {password, setPassword} = props
    const [showPassword, setShowPassword] = useState(false)

    let DEBUG = true;
    
    // TO FIX: CURSOR SHOULD BE AT THE END OF THE PASSWORD TEXT AFTER CLICK 
    function handleClickShowPw() {
        setShowPassword(!showPassword);
    }

    return (  
        <div className='inputBox' >
            <label className='formLabel' for='password'>
                <PasswordIcon />
            </label>
            <input 
                className='formInput'
                autoComplete='password' 
                type={showPassword ? 'text' : 'password'}
                name='password' 
                placeholder='password' 
                value={password}
                required 
                onChange={(e)=> setPassword(e.target.value)}
            />
                <div
                    className='showHidePassword'
                    onClick={handleClickShowPw}
                >
                  {showPassword ? <ShowPasswordIcon /> : <HidePasswordIcon />}
                </div>
        </div>
    );
}
 
export default PasswordShowHide;