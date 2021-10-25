import React, { useContext } from 'react';
import { useParams } from 'react-router';
import { AppStateContext } from '../../contexts/AppStateContext';
import createHistory from 'history/createBrowserHistory';
import Loader from '../generic/Loader';
import { Link } from 'react-router-dom';
import PetProfileCard from '../generic/PetProfileCard';
import { AuthContext } from '../../contexts/AuthContext';


const PetProfile = () => {
    const { id } = useParams();
    const { pets, users, loader} = useContext(AppStateContext);
    const { token } = useContext(AuthContext);

    let DEBUG = true;

    // if (DEBUG) console.log('pets array PetProfile', pets)
    // if (DEBUG) console.log('users from PetProfile', users)

    function getPetAndUserData(id, petArr, userArr, token) {
        for (let i = 0; i < petArr.length; i++) {
                for (let j = 0; j < userArr.length; j++) {
                    if (id == petArr[i].id) {
                        if (petArr[i].userid == userArr[j].id) {
                            if (!token) {
                                return <PetProfileCard pet={petArr[i]} />;
                            } else {
                                return <PetProfileCard pet={petArr[i]} user={userArr[j]} token={token} />;
                            }
                        }
                    }
            }
        }
    }

    // if (DEBUG) console.log(getPetAndUserData(id, pets, users));

    createHistory().replace(`/petprofile/${id}`);

    // if (DEBUG) console.log('typeof id', typeof id)
    // if (DEBUG) console.log('id', id)

    if (loader) {
        return (
            <Loader />
        );
    }

    return (  
        <>
        <main className='petMain'>
            <section>
                {/* {getPetAndUserData(id, pets)} */}
                {getPetAndUserData(id, pets, users, token)}
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