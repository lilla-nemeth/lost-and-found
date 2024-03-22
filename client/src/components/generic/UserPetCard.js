import React, { useState } from 'react';
import { petDate, isInputEmpty, removeOverflowText } from '../../utils/HelperFunctions.js';
import LoaderButton from './LoaderButton.js';

const UserPetCard = (props) => {
	const { pet, deletePet, allChecked, parentCallback } = props;
	const [checked, setChecked] = useState(false);

	let DEBUG = false;

	let disabledLocal = !checked;

	const buttonCardChecked = (
		<div>
			<button
				className={disabledLocal ? 'deletePetButtonInactive' : 'deletePetButton'}
				disabled={disabledLocal}
				onClick={() => {
					deletePet(pet.id);
				}}
			>
				<div className='deletePetButtonText'>Delete Pet</div>
			</button>
		</div>
	);

	const buttonAllChecked = (
		<div>
			<button className='deletePetButtonInvisible' disabled={disabledLocal}>
				Delete Pet
			</button>
		</div>
	);

	return (
		<div className='userPetContainer'>
			<div className='userPet'>
				<div className='userPetInner'>
					<div className='userPetPictureContainer'>
						<img className='userPetPicture' alt='img' src={`data:image/jpg;base64,${pet.img}`} />
					</div>
					<div className='userPetTextBox'>
						<table className='table'>
							<tbody>
								<tr>
									<td className='tableCell'>
										<div className='petStatus'>{pet.petstatus}</div>
									</td>
									<td className='tableCell'>
										<label className='checkboxContainer'>
											<input
												type='checkbox'
												checked={checked || allChecked}
												onChange={() => {
													setChecked(!checked);
													parentCallback(checked);
												}}
											/>
											<span className='checkmark'></span>
										</label>
									</td>
								</tr>
								<tr>
									<td colSpan='2' className='petSpecies'>
										{pet.species}
									</td>
								</tr>
								<tr className='petMainInfo'>{petDate(pet.petstatus, pet.since, pet.until, 'tableCell')}</tr>
								<tr className='petMainInfo'>{isInputEmpty('Location', removeOverflowText(pet.petlocation, 40), 'tableCell')}</tr>
							</tbody>
						</table>
						{allChecked ? buttonAllChecked : buttonCardChecked}
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserPetCard;
