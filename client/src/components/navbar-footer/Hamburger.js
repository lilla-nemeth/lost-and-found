import React from 'react';

const Hamburger = (props) => {
    const { hamburgerOpen } = props;

    if (hamburgerOpen) {
        document.body.classList.add('burgerOverflow');
      } else {
        document.body.classList.remove('burgerOverflow');
    }


    return(
        <div className='hamburger'>
            <div className='hamburgerInner'>
                <div className={hamburgerOpen ? 'burgerActive' : 'burgerInactive'}></div>
                <div className={hamburgerOpen ? 'burgerActive' : 'burgerInactive'}></div>
                <div className={hamburgerOpen ? 'burgerActive' : 'burgerInactive'}></div> 
            </div>
        </div>
    )
    
}

export default Hamburger;