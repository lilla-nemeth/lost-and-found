import React from 'react';

const Footer = (props) => {
    const { isFooterBgTransparent } = props;

    let DEBUG = true;

    return ( 
        <>
        { isFooterBgTransparent ? 
            <div className='footerWithPicture'>
                <div className='footerText'>
                    &copy; {new Date().getFullYear()} Lost & Found by Lilla Németh
                </div>
            </div>
        :    
            <div className='footerWithoutPicture'>
                <div className='footerText'>
                    &copy; {new Date().getFullYear()} Lost & Found by Lilla Németh
                </div>
            </div> 
        }
        </>
    );
}

export default Footer;