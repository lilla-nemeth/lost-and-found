import React from 'react';

const SelectAll = (props) => {
	const { deleteUserAllPets, allChecked, setAllChecked, petCardChecked, setPetCardChecked, disable } = props;

	let DEBUG = false;

	return (
		<div className='selectBox'>
			<div className='deleteAllButtonBox'>
				<button
					className={disable.toString() ? 'deleteAllButtonInactive' : 'deleteAllButton'}
					disable={disable.toString()}
					onClick={() => deleteUserAllPets()}
				>
					Delete All Pets
				</button>
			</div>
			<div>
				<label className='bigCheckboxContainer'>
					<input
						type='checkbox'
						checked={allChecked}
						onChange={() => {
							setAllChecked(!allChecked);
							setPetCardChecked(petCardChecked);
						}}
					/>
					<span className='bigCheckmark'></span>
				</label>
			</div>
		</div>
	);
};

export default SelectAll;