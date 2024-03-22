import React from 'react';
import { isInputEmpty } from '../../utils/HelperFunctions.js';

const PetUserData = (props) => {
	const { user } = props;

	return (
		<>
			<tr className='petOptionalInfo'>{isInputEmpty('uploader', user.username, 'tableCell')}</tr>
			<tr className='petOptionalInfo'>{isInputEmpty('email', user.email, 'tableCell')}</tr>
			<tr className='petOptionalInfo'>{isInputEmpty('phone', user.phone, 'tableCell')}</tr>
		</>
	);
};

export default PetUserData;
