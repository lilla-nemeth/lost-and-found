import React, { useContext, useEffect, useState } from 'react';
import { createBrowserHistory } from 'history';
import { AppStateContext } from '../../contexts/AppStateContext';
import { AuthContext } from '../../contexts/AuthContext';
import Loader from '../generic/Loader';
import { handleError, changeCheckboxValue } from '../HelperFunctions.js';
import Checkbox from '../generic/Checkbox';
import UserPetCard from '../generic/UserPetCard';
import Sidebar from '../generic/Sidebar';
import SelectAll from '../generic/SelectAll';

let history = createBrowserHistory();

const Dashboard = () => {
    const { token } = useContext(AuthContext);
    const { 
        getUserPets, 
        deleteOnePet, 
        deleteAllPets, 
        userPets, 
        setUserPets,
        getAllPets,
        setAllPets,
        fetchPets, 
        limit, 
        offset, 
        setPets, 
        getNumberOfPets, 
        setTotal,
        loader, 
        setLoader 
    } = useContext(AppStateContext);
    const [allChecked, setAllChecked] = useState(false);
    const [petCardChecked, setPetCardChecked] = useState('');
    const [deleting, setDeleting] = useState(false);

    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successButtonMsg, setSuccessButtonMsg] = useState('Deleting...');

    const [loading, setLoading] = useState(false);

    let DEBUG = false;

    let disable = !allChecked || loading;

    if (DEBUG) console.log('userPets', userPets);

    history.replace('/dashboard');

    function deleteUserPet(id) {
        setLoading(true);

            deleteOnePet({
                id,
                token,
                successCallback: res => {
                    setLoading(false);
                    getUserPets({
                        token,
                        successCallback: res => {
                            setUserPets(res.data)
                        }
                    });
                    setSuccessMsg(res);
                    setDeleting(true);
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
                    });
                    getAllPets({
                        successCallback: res => {
                            setLoading(false);
                            setAllPets(res.data);
                        }
                    });
                },
                successTimeout: () => (setTimeout(() => {
                    setSuccessMsg('');
                }, 5000)),
                errorCallback: err => {
                    setLoading(false);
                    handleError(err, setErrorMsg);
                }
            })
        }

    function deleteUserAllPets() {
        setLoading(true);

        if (!disable) {
            deleteAllPets({
                token,
                successCallback: res => {
                    setLoading(false);
                    setUserPets([]);
                    setDeleting(true);
                    setAllChecked('');
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
                    });
                    getAllPets({
                        successCallback: res => {
                            setAllPets(res.data)
                        }
                    });  
                },
                successTimeout: () => (setTimeout(() => {
                    setSuccessMsg('');
                }, 5000)),
                errorCallback: err => {
                    setLoading(false);
                    handleError(err, setErrorMsg);
                }
            })
        }
    }

    function handleCallback(status) {
        setPetCardChecked(status);
    }

    function uploadedPets() {
        return userPets.map(pet => {
            return (
                <UserPetCard 
                    key={pet.id} 
                    pet={pet} 
                    deleteUserPet={deleteUserPet} 
                    allChecked={allChecked} 
                    parentCallback={handleCallback}
                />
            )
        });
    }

    if (DEBUG) console.log('userPets', userPets);

    if (loader) {
        return (
            <Loader />
        );
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
                            <SelectAll 
                                deleteUserAllPets={deleteUserAllPets} 
                                allChecked={allChecked} 
                                setAllChecked={setAllChecked} 
                                petCardChecked={petCardChecked}
                                setPetCardChecked={setPetCardChecked}
                                disable={disable}
                            />
                            {uploadedPets()}
                        </div>
                    </div>
            </section>
        </main>
    );
}
 
export default Dashboard;