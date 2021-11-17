import React, { useContext, useEffect, useState } from 'react';
import { createBrowserHistory } from 'history';
import { AppStateContext } from '../../contexts/AppStateContext';
import { AuthContext } from '../../contexts/AuthContext';
import Loader from '../generic/Loader';
import { handleError, changeCheckboxValue } from '../HelperFunctions.js';
import Checkbox from '../generic/Checkbox';
import UserPetCard from '../generic/UserPetCard';
import Sidebar from './Sidebar';

let history = createBrowserHistory();

const Dashboard = () => {
    const { token } = useContext(AuthContext);
    const { getUserPets, deleteOnePet, userPets, setUserPets, fetchPets, limit, offset, setPets, getNumberOfPets, setTotal, loader, setLoader } = useContext(AppStateContext);
    // const [loader, setLoader] = useState(true);
    
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    let DEBUG = false;

    if (DEBUG) console.log('userPets', userPets);

    history.replace('/dashboard');

    function deleteUsersPet(id) {
        deleteOnePet({
            id,
            token,
            successCallback: res => {
                getUserPets({
                    token,
                    successCallback: res => {
                        setUserPets(res.data)
                    }
                });
                setSuccessMsg(res);
                fetchPets({
                    limit,
                    offset,
                    successCallback: res => {
                        setPets(res.data);
                        setLoader(false);
                        getNumberOfPets({
                            successCallback: res => {
                                setTotal(Number(res.data));
                            }
                        })
                    }
                })
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
        
    if (DEBUG) console.log('userPets', userPets);
    
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