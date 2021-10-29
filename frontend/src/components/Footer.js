import React from 'react';

const Footer = (props) => {
    const { isFooterBgTransparent } = props;

    let DEBUG = true;

    return (
        <div className={isFooterBgTransparent ? 'footerWithPicture' : 'footerWithoutPicture'}>
            <div className='footerText'>
                &copy; {new Date().getFullYear()} Lost & Found by Lilla Németh
            </div>
        </div>
    );
}

export default Footer;