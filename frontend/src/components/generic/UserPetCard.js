import React, { useState } from 'react';
import { petDate, isInputEmpty } from '../HelperFunctions.js';
import LoaderButton from './LoaderButton.js';

const UserPetCard = (props) => {
    const { pet, deleteUserPet, allChecked, parentCallback} = props;
    const [checked, setChecked] = useState(false);
    const [deleting, setDeleting] = useState(false);

    let DEBUG = false;

    let disabledLocal = !checked

    if (DEBUG) console.log(pet);
    if (DEBUG) console.log('allChecked', allChecked);

    const buttonCardChecked = (
        <div> 
            {!deleting ?
                <button 
                    className={disabledLocal ? 'deletePetButtonInactive' : 'deletePetButton'}
                    disabled={disabledLocal}
                    onClick={() => {setDeleting(!false); deleteUserPet(pet.id)}}
                >
                    <div className='deletePetButtonText'>Delete Pet</div> 
                </button>
            :
                <button 
                    className='deletePetButtonInactive'
                    disabled={disabledLocal}
                    onClick={() => deleteUserPet(pet.id)}
                >
                <>
                    <LoaderButton />
                    <div className='deletePetButtonText'>Deleting...</div>
                </> 
                </button>
            }
        </div>
    );

    const buttonAllChecked = (
        <div>
            <button 
                className='deletePetButtonInvisible'
                disabled={disabledLocal}
            >
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
                                        <div className='petStatus'>
                                            {pet.petstatus}
                                        </div>
                                    </td>
                                    <td className='tableCell'>
                                        <label className='checkboxContainer'>
                                            <input
                                              type='checkbox'
                                              checked={allChecked || (checked || parentCallback(checked))}
                                              onChange={() => {setChecked(!checked); parentCallback(!checked)}}
                                            />
                                            <span className='checkmark'></span>
                                        </label>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='tableCell'>
                                        <div className='petSpecies'>
                                            {pet.species}
                                        </div>
                                    </td>
                                    <td className='tableCell'>
                                    </td>
                                </tr>
                                <tr className='petMainInfo'>
                                    {isInputEmpty('ID', ('#' + pet.id), 'tableCell')}
                                </tr>
                                <tr className='petMainInfo'>
                                    {petDate(pet.petstatus, pet.since, pet.until, 'tableCell')}
                                </tr>
                                <tr className='petMainInfo'> 
                                    {isInputEmpty('Location', (pet.petlocation), 'tableCell')}
                                </tr>
                            </tbody>
                        </table>
                        { allChecked ? buttonAllChecked : buttonCardChecked }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserPetCard;