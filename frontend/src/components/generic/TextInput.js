import React from 'react';

const TextInput = (props) => {
    const { headlineName, id, name, type, value, placeholder, onChange, required } = props;

    let DEBUG = true;

    return (  
            <div className='inputBox'>
                <input 
                    className='formInput' 
                    id={id}
                    name={name} 
                    type={type} 
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                />
            </div>
    );
}
 
export default TextInput;