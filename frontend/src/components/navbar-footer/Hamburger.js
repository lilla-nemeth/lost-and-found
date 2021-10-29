import React from 'react';

const Hamburger = (props) => {

    const { hamburgerOpen } = props;

    return(
        <div className='hamburger'>
            <div className={hamburgerOpen ? 'burgerActive' : 'burgerInactive'}></div>
            <div className={hamburgerOpen ? 'burgerActive' : 'burgerInactive'}></div>
            <div className={hamburgerOpen ? 'burgerActive' : 'burgerInactive'}></div> 
        </div>
    )
    
}

export default Hamburger;