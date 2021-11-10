import React, { useContext, useState } from 'react';
import { createBrowserHistory } from 'history';
import { AppStateContext } from '../../contexts/AppStateContext';
import { AuthContext } from '../../contexts/AuthContext';
import { handleError, changeCheckboxValue } from '../HelperFunctions.js';
import Checkbox from '../generic/Checkbox';
import UserPetCard from '../generic/UserPetCard';
import Sidebar from './Sidebar';

let history = createBrowserHistory();

const Dashboard = () => {
    const { token } = useContext(AuthContext);
    const { userPets, setUserPets, deleteOnePet } = useContext(AppStateContext);
    
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    let DEBUG = true;

    if (DEBUG) console.log(userPets);

    history.replace('/dashboard');

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
                <UserPetCard key={pet.id} pet={pet} deleteUsersPet={deleteUsersPet} />
            )
        });
    }
        

    return (
        <main className='petMain'>
            <section>
                <h1 className='lostAndFoundHeadline'>My Posts</h1>
                    <div className='dashboardContainer'>
                        <div className='dashboardSidebar'>
                            <Sidebar />
                        </div>
                        <div className='dashboardBox'>
                            {uploadedPets()}
                        </div>
                    </div>
            </section>
        </main>
    );
}
 
export default Dashboard;


                        // <button onClick={() => deleteUsersPet(pet.id)}>Delete Pet</button>
                        // {uploadedPets}
                        // <div className='filterBox'> 
                        //         <input
                        //             type='checkbox'
                        //             checked={checked}
                        //             onChange={event => setChecked(event.target.checked)}
                        //         />
                        //         <label>Select</label>
                        //     <ul className='radioList'>
                        //         <Checkbox
                        //             id={'black'} 
                        //             name={'color'} 
                        //             value={'black'} 
                        //             checked={colors.includes('black')} 
                        //             onChange={() => changeCheckboxValue(colors, setColors, 'black')}
                        //             labelFor={'black'} 
                        //             labelName={'Black'}
                        //         />
                        //     </ul>
                        // </div>
                        // <div>
                        //     <button 
                        //         className={disabled ? 'formButtonInactive' : 'formButton'}
                        //         disabled={disabled}
                        //     >
                        //         Delete Pet
                        //     </button>
                        // </div>