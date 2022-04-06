import React from 'react';
import { petDate, isInputEmpty } from '../HelperFunctions.js';
import PetUserData from './PetUserData.js';

const PetProfileCard = (props) => {
  const { pet, user } = props;

  let DEBUG = false;

  if (DEBUG) console.log(pet.userid);
  if (DEBUG) console.log('PetProfileCard - user', user);

  return (
    <div className='petProfileContainer'>
      <div className='petProfileCard'>
        <div className='petProfileCardInner'>
          <div className='petProfilePictureContainer'>
            <img
              className='petProfilePicture'
              alt='img'
              src={`data:image/jpg;base64,${pet.img}`}
            />
          </div>
          <div className='petProfileTextBox'>
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
                <tr className='petMainInfo'>
                  {isInputEmpty('ID', '#' + pet.id, 'tableCell')}
                </tr>
                <tr className='petMainInfo'>
                  {petDate(pet.petstatus, pet.since, pet.until, 'tableCell')}
                </tr>
                <tr className='petMainInfo'>
                  {isInputEmpty('Location', pet.petlocation, 'tableCell')}
                </tr>
                <tr className='petOptionalInfo'>
                  {isInputEmpty('Size', pet.petsize, 'tableCell')}
                </tr>
                <tr className='petOptionalInfo'>
                  {isInputEmpty('Sex', pet.sex, 'tableCell')}
                </tr>
                <tr className='petOptionalInfo'>
                  {isInputEmpty('Breed', pet.breed, 'tableCell')}
                </tr>
                <tr className='petOptionalInfo'>
                  {isInputEmpty('Color', pet.color, 'tableCell')}
                </tr>
                <tr className='petOptionalInfo'>
                  {isInputEmpty('Age', pet.age, 'tableCell')}
                </tr>
                <tr className='petOptionalInfo'>
                  {isInputEmpty(
                    'Unique feature',
                    pet.uniquefeature,
                    'tableCell'
                  )}
                </tr>
                <tr className='petOptionalInfo'>
                  {isInputEmpty(
                    'Description',
                    pet.postdescription,
                    'tableCell'
                  )}
                </tr>
                {!user ? <></> : <PetUserData user={user} />}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetProfileCard;
