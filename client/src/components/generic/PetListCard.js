import React from 'react';
import { Link } from 'react-router-dom';
import { petDate, isInputEmpty, removeOverflowText } from '../../utils/HelperFunctions.js';

const PetListCard = (props) => {
	const { pet } = props;

	return (
		<div className='petListCard' key={pet.id}>
			<div className='petListCardInner'>
				<div className='petListPictureContainer'>
					<img className='petListPicture' alt='img' src={`data:image/jpg;base64,${pet.img}`} />
				</div>
				<div className='petListTextBox'>
					<table className='table'>
						<tbody>
							<tr>
								<td className='tableCell'>
									<div className='petStatus'>{pet.petstatus}</div>
								</td>
								<td className='tableCell'></td>
							</tr>
							<tr>
								<td colSpan='2' className='petSpecies'>
									{pet.species}
								</td>
							</tr>
							<tr className='petMainInfo'>{petDate(pet.petstatus, pet.since, pet.until, 'tableCell')}</tr>
							<tr className='petMainInfo'>{isInputEmpty('Location', removeOverflowText(pet.petlocation, 14), 'tableCell')}</tr>
						</tbody>
					</table>
					<Link to={`/petprofile/${pet.id}`}>
						<button className='formButton'>View Pet</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default PetListCard;
