import React, { useState } from 'react';
import { ReactComponent as PasswordIcon } from '../../assets/icons/password.svg';
import { ReactComponent as ShowPasswordIcon } from '../../assets/icons/showpassword.svg';
import { ReactComponent as HidePasswordIcon } from '../../assets/icons/hidepassword.svg';

const PasswordShowHide = (props) => {
  const { password, setPassword } = props;
  const [showPassword, setShowPassword] = useState(false);

  let DEBUG = false;

  function handleClickShowPw() {
    setShowPassword(!showPassword);
  }

  return (
    <div className='inputBox'>
      <label className='formLabel' htmlFor='password'>
        <PasswordIcon />
      </label>
      <input
        className='formInput'
        type={showPassword ? 'text' : 'password'}
        name='password'
        placeholder='password'
        value={password}
        required
        onChange={(event) => setPassword(event.target.value)}
      />
      <div className='showHidePassword' onClick={handleClickShowPw}>
        {showPassword ? <ShowPasswordIcon /> : <HidePasswordIcon />}
      </div>
    </div>
  );
};

export default PasswordShowHide;
