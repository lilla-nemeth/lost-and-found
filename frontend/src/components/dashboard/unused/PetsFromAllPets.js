import React, { useContext, useState } from 'react';
import { createBrowserHistory } from 'history';
import { AppStateContext } from '../../../contexts/AppStateContext';
import { AuthContext } from '../../../contexts/AuthContext';
import { handleError, clearError } from '../../HelperFunctions.js';
import Checkbox from '../../generic/Checkbox';
import PetListCard from '../../generic/PetListCard';

let history = createBrowserHistory();

const PetsFromAllPets = () => {
    const { token } = useContext(AuthContext);
    const { allPets, users, username, deleteOnePet } = useContext(AppStateContext);
    const [userPets, setUserPets] = useState([]);

    const [checked, setChecked] = useState(false);
    // const [colors, setColors] = useState([]);

    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    let DEBUG = false;

    history.replace('/dashboard');

    // button is disabled if the checkbox is unchecked:
    let disabled = !checked;


    // if (DEBUG) console.log('PetsFromAllPets - allPets', allPets);
    // if (DEBUG) console.log('PetsFromAllPets - users', users);

    function deleteUsersPet(id) {

        deleteOnePet({
            id,
            token,
            successCallback: res => {
                setUserPets('');
                setSuccessMsg(res);
            },
            successTimeout: () => (setTimeout(() => {
                setSuccessMsg('');
            }, 5000)),
            errorCallback: err => {
                clearError();
                handleError(err, setErrorMsg);
            }
        })
    }

    // allPets -> map -> pet -> userPet.push(pet) - 

    function listUsersPets(petArr, userArr, name) {
    
        let filteredPets = [];

        // A: With filter:
        userArr.filter(user => {
            petArr.filter(pet => {
                if (user.username === name && user.id === pet.userid) {
                    return filteredPets.push(pet);
                }
            })
        })

        // B: With for loop
        // for (let i = 0; i < userArr.length; i++) {
        //     for (let j = 0; j < petArr.length; j++) {
        //         if (userArr[i].username === name && userArr[i].id === petArr[j].userid) {
        //             filteredPets.push(petArr[j]);
        //         } 
        //     }
        // }
            
        if (DEBUG) console.log(filteredPets);
         
        return filteredPets.map(pet => {
            return (
                <PetListCard key={pet.id} pet={pet}  />
            )
        });
    }

    if (DEBUG) console.log(listUsersPets(allPets, users, username));
    

    return (
        <main className='petMain'>
            <section>
                <div className='petListContainer'>
                    <h1 className='lostAndFoundHeadline'>My Posts</h1>
                    {/* <button onClick={() => deleteUsersPet(pet.id)}>Delete Pet</button> */}
                    {listUsersPets(allPets, users, username)}
                    <div className='filterBox'> 

                        <ul className='radioList'>
                            {/* <Checkbox
                                id={'black'} 
                                name={'color'} 
                                value={'black'} 
                                checked={colors.includes('black')} 
                                onChange={() => changeCheckboxValue(colors, setColors, 'black')}
                                labelFor={'black'} 
                                labelName={'Black'}
                            /> */}

                            {/* <li className='checkboxOption'> */}
                                <input
                                    type='checkbox'
                                    checked={checked}
                                    onChange={event => setChecked(event.target.checked)}
                                />
                                <label>Select</label>
                                {/* <div className='checkboxCheck'>
                                    <div className='checkboxCheckInside'>
                                    </div>
                                </div>
                            </li> */}

                        </ul>
                    </div>
                    <div>
                        <button 
                            className={disabled ? 'formButtonInactive' : 'formButton'}
                            disabled={disabled}
                        >
                            Delete Pet
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}
 
export default PetsFromAllPets;