import React from 'react';

const RadioButton = (props) => {
    const { id, name, value, checked, onChange, labelFor, labelName, required } = props;

    let DEBUG = true;

    return (
        <>
            <li className='radioButtonOption'>
                <input  
                    type='radio' 
                    id={id} 
                    name={name} 
                    value={value} 
                    checked={checked} 
                    onChange={onChange}
                    required={required}
                />
                <label for={labelFor}>
                    {labelName}
                </label>
                <div class="radioCheck">
                    <div class="radioCheckInside">
                    </div>
                </div>
            </li>
        </>
    );
}
 
export default RadioButton;