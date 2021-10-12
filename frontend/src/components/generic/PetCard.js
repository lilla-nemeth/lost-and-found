import React from 'react';
import { petDate, isInputEmpty } from '../HelperFunctions.js';

const PetCard = (props) => {
    const { pet } = props;


    const style = {
        td: {
            width: '50%'
        }
    }

    let DEBUG = true;


    // Write a function for that: 
    // If pet inputs are empty then the PetCard doesn't show those fields



    if (DEBUG) console.log('isInputEmpty func',isInputEmpty('Unique feature', (pet.uniquefeature)))

    return (
        <div className='petProfileContainer'>
            <div className='petProfileCard'>
                <div className='petProfileCardInner'>
                    <div className='petProfilePictureContainer'>
                        <img className='petProfilePicture' src={`data:image/jpg;base64,${pet.img}`} />
                    </div>

                    <div className='petProfileTextBox'>
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
                          <tr>
                            <td classname='tableCell'>
                                <div className='petMainInfo'>
                                    #{pet.id}
                                </div>
                            </td>
                            <td classname='tableCell'>
                            </td>
                          </tr>
                          <tr className='petMainInfo'>
                            {petDate(pet.petstatus, pet.since, pet.until, 'tableCell')}
                          </tr>
                          <tr className='petMainInfo'> 
                            {isInputEmpty('Location', (pet.petlocation), 'tableCell')}
                          </tr>
                          <tr className='petOptionalInfo'>
                            {isInputEmpty('Size', (pet.petsize), 'tableCell')}
                          </tr>
                          <tr className='petOptionalInfo'>
                            {isInputEmpty('Breed', (pet.breed), 'tableCell')}
                          </tr>
                          <tr className='petOptionalInfo'>
                            {isInputEmpty('Color', (pet.color), 'tableCell')}
                          </tr>
                          <tr className='petOptionalInfo'>
                            {isInputEmpty('Age', (pet.age), 'tableCell')}
                          </tr>
                          <tr className='petOptionalInfo'>
                            {isInputEmpty('Unique feature', (pet.uniquefeature), 'tableCell')}
                          </tr>
                          <tr className='petOptionalInfo'>
                            {isInputEmpty('Description', (pet.postdescription), 'tableCell')}
                          </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PetCard;