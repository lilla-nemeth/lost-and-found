import React, { useContext } from 'react';
import { AppStateContext } from '../../contexts/AppStateContext.js';
import { v4 as uuidv4 } from 'uuid';
import { increaseNumber } from '../../utils/HelperFunctions.js';

const PetPage = () => {
	const { total, limit, setOffset } = useContext(AppStateContext);

	return (
		<div className='pagination'>
			{increaseNumber(total, limit).map((page) => {
				return (
					<div key={uuidv4()} onClick={() => setOffset(page * limit)} className='paginationNumbers'>
						{page + 1}
					</div>
				);
			})}
		</div>
	);
};

export default PetPage;
