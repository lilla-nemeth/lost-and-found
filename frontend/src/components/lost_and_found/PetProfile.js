import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ApiContext } from '../../contexts/ApiContext';
import createHistory from 'history/createBrowserHistory';
import Loader from '../generic/Loader';
import { Link } from 'react-router-dom';
import { petDate } from './HelperFunctions.js';

const styles = {
    main: {
        fontFamily: '"Poppins", sans-serif',
        background: '#B0F0EB',
        overflow: 'hidden'
    }
}

// props
const PetProfile = () => {
    // with useParams is possible to get the params from url in the component
    const { id } = useParams();
    const { getOnePet } = useContext(ApiContext);
    const [pets, setPets] = useState([]);

    const [loader, setLoader] = useState(true);

    // success/error messages
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    let DEBUG = true;

    useEffect(() => {
        getOnePet({
            id,
            successCallback: res => {
                setLoader(false);
                setPets(res.data);
            },
            errorCallback: err => setErrorMsg(err)
        })

    },[]);

    createHistory().replace(`/petprofile/${id}`);

    if (DEBUG) console.log('pets array', pets)
    if (DEBUG) console.log('typeof id', typeof id)
    if (DEBUG) console.log('id', id)

    if (loader) {
        return (
            <Loader />
        );
    }

    return (  
        <>
        <main style={styles.main}>
            <section>
            <Link to={'/lostandfound'}><button className='formButton'>Back to the Lost and Found Page</button></Link>
            {pets.map(pet => {
                return (
                    <div className='petCard' key={pet.id}>
                        <div className='petCardInner'>
                            <div className='petPictureContainer'>
                                <img className='petPicture' src={`data:image/jpg;base64,${pet.img}`} />
                            </div>
                            <div className='petTextBox'>
                                <div className='petStatus'>
                                    {pet.petstatus}
                                </div>
                                <div className='petSpecies'>
                                    {pet.species}
                                </div>
                                <div className='petId'>
                                    #{pet.id}
                                </div>
                                <div className='petDate'>
                                    {petDate(pet.petstatus, pet.since, pet.until)}
                                </div>
                                <div className='petPlace'>
                                    {pet.petlocation}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })} 

            </section>
        </main>
        </>
    );
}
 
export default PetProfile;