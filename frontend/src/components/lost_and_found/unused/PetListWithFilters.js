import React, { useState, useEffect, useContext } from 'react';
import { handleError } from '../../HelperFunctions.js';
import { AppStateContext } from '../../../contexts/AppStateContext';
import PetListCard from '../../generic/PetListCard';
import PetSearch from './PetSearch.js';

const PetListWithFilters = () => {
    const [status, setStatus] = useState([]);
    const [species, setSpecies] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const { pets, allPets } = useContext(AppStateContext);

    let DEBUG = false;

    return (  
        <>
            <div className='petListContainer'>
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
                            if (species == filteredPet.species && status == filteredPet.petstatus) {
                                return filteredPet;
                            } 
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
