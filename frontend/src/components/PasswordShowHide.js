
import React, { useState } from 'react';
import { ReactComponent as PasswordIcon } from '../assets/icons/password.svg';
import { ReactComponent as HidePasswordIcon } from '../assets/icons/hidepassword.svg';
import { ReactComponent as ShowPasswordIcon } from '../assets/icons/showpassword.svg';

const PasswordShowHide = (props) => {

    const { pwValues = {        
        pw: '',
        showPassword: false,
    }, 
        setPwValues } = props;



    let DEBUG = true;
    
    // TO FIX: CURSOR SHOULD BE AT THE END OF THE PASSWORD TEXT AFTER CLICK 
    function handleClickShowPw(event) {
        event.preventDefault();
        setPwValues({...pwValues, showPassword: !pwValues.showPassword});
    }

    function handleMouseDownPw(event) {
        event.preventDefault();
    }

    const handleChangePw = (prop) => (event) => {
        setPwValues({...pwValues, [prop]: event.target.value });
    }

    return (  
        <div className='inputBox' >
            <label className='formLabel' for='password'>
                <PasswordIcon />
            </label>
            <input 
                className='formInput'
                autoComplete='password' 
                type={pwValues.showPassword ? 'text' : 'password'}
                name='password' 
                placeholder='password' 
                value={pwValues.pw}
                required 
                onChange={handleChangePw('pw')}
            />
                <div
                    className='showHidePassword'
                    onClick={handleClickShowPw}
                    // onMouseDown={handleMouseDownPw}
                >
                  {pwValues.showPassword ? <ShowPasswordIcon /> : <HidePasswordIcon />}
                </div>
        </div>
    );
}
 
export default PasswordShowHide;