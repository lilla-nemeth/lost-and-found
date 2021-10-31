import React, { useContext, useState } from 'react';
import { AppStateContext } from '../../contexts/AppStateContext';
import PetListCard from '../generic/PetListCard';
import Search from '../generic/Search';

const PetList = () => {
    // TODO: Fix it: Search from all pets
    const [search, setSearch] = useState('');
    
    const { pets } = useContext(AppStateContext);

    let DEBUG = false;

    // lost -> since (in progress cases)
    // found -> since (in progress cases)
    // reunited -> until (ready to close cases)

    if (DEBUG) console.log('pets arr from PetList', pets);

    return (  
        <>
            <Search search={search} setSearch={setSearch} />
            <div className='petContainer'>
                <h1 className='lostAndFoundHeadline'>Lost and Found Pets</h1>
                    {pets.filter(pet => {
                        if (search == '') {
                            return pet
                        } else if (
                            // TODO: fix this, it's ugly:
                            pet.petlocation.toLowerCase().includes(search.toLowerCase()) || 
                            pet.petstatus.toLowerCase().includes(search.toLowerCase()) || 
                            pet.species.toLowerCase().includes(search.toLowerCase()) || 
                            pet.petsize.toLowerCase().includes(search.toLowerCase()) ||
                            pet.breed.toLowerCase().includes(search.toLowerCase()) ||
                            pet.sex.toLowerCase().includes(search.toLowerCase()) ||
                            pet.color.toLowerCase().includes(search.toLowerCase()) ||
                            pet.age.toLowerCase().includes(search.toLowerCase()) ||
                            pet.uniquefeature.toLowerCase().includes(search.toLowerCase()) ||
                            pet.postdescription.toLowerCase().includes(search.toLowerCase())
                        ) {
                            return pet
                        }
                    }).map(pet => {
                        return (
                            <PetListCard key={pet.id} pet={pet}/>
                        );
                    })}
            </div>
        </>
    );
}
 
export default PetList;
