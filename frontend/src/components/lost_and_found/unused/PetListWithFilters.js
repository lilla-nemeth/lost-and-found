import React, { useState, useEffect, useContext } from 'react';
import { handleError } from '../../HelperFunctions.js';
import { AppStateContext } from '../../../contexts/AppStateContext';
import PetListCard from '../../generic/PetListCard';
import PetSearch from './PetSearch.js';

const PetListWithFilters = () => {
    const [allPets, setAllPets] = useState([]);

    const [status, setStatus] = useState([]);
    const [species, setSpecies] = useState([]);

    const [errorMsg, setErrorMsg] = useState('');

    const { pets, getAllPets } = useContext(AppStateContext);

    let DEBUG = true;

    useEffect(() => {
        getAllPets({
            successCallback: res => {
                setAllPets(res.data)
            },
            errorCallback: err => {
                handleError(err, setErrorMsg);
            }
        });
    },[]);

    if (DEBUG) console.log(species);

    return (  
        <>
            <div className='petContainer'>
                <h1 className='lostAndFoundHeadline'>Lost and Found Pets</h1>
                <PetSearch status={status} setStatus={setStatus} species={species} setSpecies={setSpecies} />
                
                    {species && species.length == 0 && status && status.length == 0  ? 
                        pets.map(pet => {
                            return (
                                <PetListCard key={pet.id} pet={pet}/>
                            );
                        })
                    :
                        allPets.filter(filteredPet => {
                            // status.includes(filteredPet.petstatus)
                            // it doesn't work with other:
                            if (species == filteredPet.species && status == filteredPet.petstatus) {
                                return filteredPet;
                            } 
                            // else if (species != filteredPet.species) {
                            //     return species === 'other' &&
                            // }
                        }).map(pet => {
                            return (
                                <PetListCard key={pet.id} pet={pet}/>
                            );
                        })
                    }

            </div>
        </>
    );
}
 
export default PetListWithFilters;
