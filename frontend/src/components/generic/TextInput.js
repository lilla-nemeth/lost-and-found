import React from 'react';

const TextInput = (props) => {
    const { headlineName, id, name, value, placeholder, onChange, required } = props;

    let DEBUG = true;

    return (  
            <div className='inputBox'>
                <input 
                    className='formInput' 
                    id={id}
                    name={name} 
                    type='text' 
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    // required={required}
                />
            </div>
    );
}
 
export default TextInput;