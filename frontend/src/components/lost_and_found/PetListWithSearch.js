import React, { useContext, useState } from 'react';
import { AppStateContext } from '../../contexts/AppStateContext';
import PetListCard from '../generic/PetListCard';
import Search from '../generic/Search';

const PetListWithSearch = () => {
    // now the allPets is 'inactive' in the AppStateContext
    const { pets, allPets } = useContext(AppStateContext);
    const [search, setSearch] = useState('');
    const [searchColumns, setSearchColumns] = useState([
        'id',
        'petstatus',
        'petlocation', 
        'species',
        'petsize',
        'breed',
        'sex',
        'color',
        'age',
        'uniquefeature',
        'postdescription'
    ]);
    
    let DEBUG = false;

    if (DEBUG) console.log('pets arr from PetList', pets);
    if (DEBUG) console.log('allPets arr from PetList', allPets);
    if (DEBUG) console.log(allPets[0]);

    // Alternative:
    // pet.petstatus.toLowerCase().includes(search.toLowerCase())

    // const columns = allPets[0] && Object.keys(allPets[0]);

    return (  
        <>
            <h1 className='lostAndFoundHeadline'>Lost and Found Pets</h1>
            <Search search={search} setSearch={setSearch} />
            <div className='petListContainer'>
                    {search === '' ?
                    pets.map(pet => {
                            return (
                                <PetListCard key={pet.id} pet={pet} />
                            );
                        })
                    :
                    allPets.filter(filteredPet => {
                        // with this, use the given pet columns from searchColumns:
                        if (searchColumns.some(column => 
                                filteredPet[column].toString().toLowerCase().indexOf(search.toLowerCase()) > -1
                            ) 
                        ) {
                            return filteredPet;
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
 
export default PetListWithSearch;
