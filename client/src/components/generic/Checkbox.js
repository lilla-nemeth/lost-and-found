import React from 'react';

const Checkbox = (props) => {
	const { id, name, value, checked, onChange, htmlFor, labelName } = props;

	return (
		<>
			<li className='checkboxOption'>
				<input type='checkbox' id={id} name={name} value={value} checked={checked} onChange={onChange} />
				<label htmlFor={htmlFor}>{labelName}</label>
				<div className='checkboxCheck'>
					<div className='checkboxCheckInside'></div>
				</div>
			</li>
		</>
	);
};

export default Checkbox;
