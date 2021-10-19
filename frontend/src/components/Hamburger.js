import React from 'react';

const Hamburger = ({hamburgerOpen}) => {

    return(
        <>
        {hamburgerOpen ? 
            <div className="hamburger">
                <div className="burgerActive"></div>
                <div className="burgerActive"></div>
                <div className="burgerActive"></div> 
            </div>
        :   
            <div className="hamburger">
                <div className="burgerInactive"></div>
                <div className="burgerInactive"></div>
                <div className="burgerInactive"></div> 
            </div> 
        }
        </>
    )


}

export default Hamburger;