import React from 'react';
import { Link } from 'react-router-dom';
import { petDate, isInputEmpty } from '../HelperFunctions.js';

const PetListCard = (props) => {
    const { pet } = props;

    let DEBUG = false;

    if (DEBUG) console.log(pet);

        return (
            <div className='petCard' key={pet.id}>
                <div className='petCardInner'>
                    <div className='petPictureContainer'>
                        <img className='petPicture' alt='img' src={`data:image/jpg;base64,${pet.img}`} />
                    </div>
                    <div className='petTextBox'>
                        <table style={{width: '100%'}}>
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
                        <Link to={`/petprofile/${pet.id}`}>
                            <button className='formButton'>View Pet</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
}

export default PetListCard;