import React, { useContext, useState } from 'react';
import { AppStateContext } from '../../../contexts/AppStateContext';
import PetListCard from '../../generic/PetListCard';
import Search from './Search';
import PetSearch from './PetSearch';

const PetListWithSearch = () => {
    // TODO: Fix it: Search from all pets
    const [search, setSearch] = useState('');

    // const [searchColumns, setSearchColumns] = useState(['petlocation', 'species']);
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
    
    const { pets } = useContext(AppStateContext);

    let DEBUG = false;

    if (DEBUG) console.log('pets arr from PetList', pets);

    // Alternative:
    // pet.petstatus.toLowerCase().includes(search.toLowerCase())

    // const columns = pets[0] && Object.keys(pets[0]);
    // const values = pets[0] && Object.values(pets[0]);

    if (DEBUG) console.log(pets[0]);

    return (  
        <>
            <Search search={search} setSearch={setSearch} />
            {/* <PetSearch search={search} setSearch={setSearch} searchValues={searchValues} setSearchValues={setSearchValues} /> */}
            
            {/* {columns && columns.map(column => <label>  
                    <input  
                         type='checkbox' 
                         checked={searchColumns.includes(column)}
                         onChange={event => {
                                 const checked = searchColumns.includes(column);
                                 setSearchColumns(prev => 
                                     checked
                                     ? 
                                     prev.filter(searchC => searchC !== column)
                                     :
                                     [...prev, column]
                                 );
                             }
                         }
                    
                     />

                 {column}  </label>)
             } */}


            <div className='petContainer'>
                <h1 className='lostAndFoundHeadline'>Lost and Found Pets</h1>
                    {pets.filter(pet => {
                        if (search == '') {
                            return pet;
                        } else if (
                            // with this, use the given pet columns from searchColumns:
                            searchColumns.some(column => 
                                pet[column].toString().toLowerCase().indexOf(search.toLowerCase()) > -1
                            ) 
                        ) {
                            return pet;
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
