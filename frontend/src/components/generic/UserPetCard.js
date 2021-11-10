import React from 'react';
import { Link } from 'react-router-dom';
import { petDate, isInputEmpty } from '../HelperFunctions.js';

const UserPetCard = (props) => {
    const { pet } = props;

    let DEBUG = false;

    if (DEBUG) console.log(pet);

        return (
            <div className='userPetCardContainer'>
                <div className='userPetCard'>
                    <div className='userPetCardInner'>
                        <div className='userPetCardPictureContainer'>
                            <img className='userPetCardPicture' alt='img' src={`data:image/jpg;base64,${pet.img}`} />
                        </div>
                        <div className='userPetCardTextBox'>
                            <table className='table'>
                                <tbody>
                                    <tr>
                                        <td className='tableCell'>
                                            <div className='petStatus'>
                                                {pet.petstatus}
                                            </div>
                                        </td>
                                        <td className='tableCell'>
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
                        </div>
                    </div>
                </div>
            </div>
        );
}

export default UserPetCard;