import React from 'react';

const TextArea = (props) => {
    const { 
        headlineName, 
        id, 
        name, 
        value, 
        placeholder, 
        rows, 
        cols, 
        onChange 
    } = props;

    let DEBUG = false;

    return (  
        <div className='filterBox'> 
        <h2 className='categoryHeadline'>{headlineName}</h2>
            <div className='inputBox'>
                <textarea
                    style={{resize: 'none'}}
                    className='formInput' 
                    id={id}
                    type='text' 
                    name={name}
                    value={value}
                    placeholder={placeholder} 
                    rows={rows}
                    cols={cols}
                    onChange={onChange}
                >
                </textarea>
            </div>
        </div>
    );
}
 
export default TextArea;