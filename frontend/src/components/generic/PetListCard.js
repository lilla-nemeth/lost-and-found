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
                        <img className='petPicture' src={`data:image/jpg;base64,${pet.img}`} />
                    </div>
                    <div className='petTextBox'>
                        <table style={{width: '100%'}}>
                            <tr>
                                <td classname='tableCell'>
                                    <div className='petStatus'>
                                        {pet.petstatus}
                                    </div>
                                </td>
                                <td classname='tableCell'>
                                </td>
                            </tr>
                            <tr>
                                <td classname='tableCell'>
                                    <div className='petSpecies'>
                                        {pet.species}
                                    </div>
                                </td>
                                <td classname='tableCell'>
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