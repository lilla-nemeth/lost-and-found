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
    const { pets, users, loader } = useContext(AppStateContext);

    let DEBUG = true;

    // if (DEBUG) console.log('pets array PetProfile', pets)
    if (DEBUG) console.log('users from PetProfile', users)


    function getPetById(id, arr) {
        for (let i = 0; i < arr.length; i++) {
            if (id == arr[i].id) {
                return <PetProfileCard pet={arr[i]} />;
            }
        }
    }

    // primaryId = user id
    // secondaryId = userId from pets
    // arr = user array
    // function getUserById(userArr, petArr, arr) {
    //     for (let i = 0; i < arr.length; i++) {
    //         if (petArr.id == userArr[i].id) {
    //             return arr;
    //         }
    //     }        
    // }
    // if (DEBUG) console.log('getUserById - user', getUserById(user.id, pets.userid, user))






    // if (DEBUG) console.log("return of getPetById", getPetById(id, pets));
    // if (DEBUG) console.log(getPetById(id, pets));



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
                {getPetById(id, pets)}
                <div className='backButtonContainer'>
                    <div className='backButtonBox'>
                        <Link to={'/lostandfound'}>
                            <button className='backButton'>Back to the Lost and Found Page</button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
        </>
    );
}
 
export default PetProfile;