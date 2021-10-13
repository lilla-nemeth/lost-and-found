import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { AppStateContext } from '../../contexts/AppStateContext';
import createHistory from 'history/createBrowserHistory';
import Loader from '../generic/Loader';
import { Link } from 'react-router-dom';
import PetProfileCard from '../generic/PetProfileCard';

const styles = {
    main: {
        fontFamily: '"Poppins", sans-serif',
        background: '#B0F0EB',
        overflow: 'hidden'
    }
}

const PetProfile = () => {
    const { id } = useParams();
    const { pets, loader } = useContext(AppStateContext);

    let DEBUG = false;

    if (DEBUG) console.log('pets array PetProfile', pets)


    function getPetById(id, arr) {
        for (let i = 0; i < arr.length; i++) {
            if (id == arr[i].id) {
                return <PetProfileCard pet={arr[i]} />;
            }
        }
    }
    
    console.log("return of getPetById", getPetById(id, pets))
    if (DEBUG) console.log(getPetById(id, pets));


    createHistory().replace(`/petprofile/${id}`);

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
                <Link to={'/lostandfound'}>
                    <button className='formButton'>Back to the Lost and Found Page</button>
                </Link>
                    {getPetById(id, pets)}
            </section>
        </main>
        </>
    );
}
 
export default PetProfile;