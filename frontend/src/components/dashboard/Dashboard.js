import React, { useContext, useState } from 'react';
import { createBrowserHistory } from 'history';
import { AppStateContext } from '../../contexts/AppStateContext';
import { AuthContext } from '../../contexts/AuthContext';
import { handleError, changeCheckboxValue } from '../HelperFunctions.js';
import Checkbox from '../generic/Checkbox';
import PetListCard from '../generic/PetListCard';

let history = createBrowserHistory();

const Dashboard = () => {
    const { token } = useContext(AuthContext);
    const { userPets, setUserPets, deleteOnePet } = useContext(AppStateContext);

    const [checked, setChecked] = useState(false);

    const [colors, setColors] = useState([]);

    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    let DEBUG = true;

    if (DEBUG) console.log(userPets);

    history.replace('/dashboard');

    // button is disabled if the checkbox is unchecked:
    let disabled = !checked;


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
            errorCallback: err => 
                handleError(err, setErrorMsg)
        })
    }

    function uploadedPets() {
        return userPets.map(pet => {
            return (
                <PetListCard key={pet.id} pet={pet}  />
            )
        });
    }
        

    return (
        <main className='petMain'>
            <section>
                <div className='petContainer'>
                    <h1 className='lostAndFoundHeadline'>My Posts</h1>
                    {/* <button onClick={() => deleteUsersPet(pet.id)}>Delete Pet</button> */}
                    {/* {uploadedPets} */}
                    <div className='filterBox'> 
                            {/* <input
                                type='checkbox'
                                checked={checked}
                                onChange={event => setChecked(event.target.checked)}
                            />
                            <label>Select</label> */}
                        <ul className='radioList'>
                            {/* <Checkbox
                                id={'black'} 
                                name={'color'} 
                                value={'black'} 
                                checked={colors.includes('black')} 
                                onChange={() => changeCheckboxValue(colors, setColors, 'black')}
                                labelFor={'black'} 
                                labelName={'Black'}
                            />  */}
                        </ul>
                    </div>
                    <div>
                        {/* <button 
                            className={disabled ? 'formButtonInactive' : 'formButton'}
                            disabled={disabled}
                        >
                            Delete Pet
                        </button> */}
                    </div>
                    {uploadedPets()}
                </div>
            </section>
        </main>
    );
}
 
export default Dashboard;