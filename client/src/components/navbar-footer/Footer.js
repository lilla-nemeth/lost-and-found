import React from 'react';

const Footer = (props) => {
	const { transparent } = props;

	return (
		<div className={transparent ? 'footerWithPicture' : 'footerWithoutPicture'}>
			<div className='footerText'>&copy; {new Date().getFullYear()} Lost & Found by Lilla Németh</div>
		</div>
	);
};

export default Footer;
