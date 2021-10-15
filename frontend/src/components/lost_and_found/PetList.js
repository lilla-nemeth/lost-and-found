import React, { useContext } from 'react';
import { AppStateContext } from '../../contexts/AppStateContext';
import createHistory from 'history/createBrowserHistory';
import Loader from '../generic/Loader';
import { v4 as uuidv4 } from 'uuid';
import PetListCard from '../generic/PetListCard';

const PetList = () => {
    const { pets, numberIncreases, setOffset, limit, loader } = useContext(AppStateContext);

    let DEBUG = true;

    // lost -> since (in progress cases)
    // found -> since (in progress cases)
    // reunited -> until (ready to close cases)

    createHistory().replace('/lostandfound');

    if (loader) {
        return (
            <Loader />
        );
    }

    if (DEBUG) console.log('pets arr from PetList', pets);

    return (  
        <div className='petContainer'>
            <h1 className='lostAndFoundHeadline'>Lost and Found Pets</h1>
            {pets.map(pet => {
                return (
                    <PetListCard key={pet.id} pet={pet}/>
                )
            })} 
            <div className='pagination'>{numberIncreases().map(page => {
                    return (
                        <div 
                            key={uuidv4()}
                            onClick={() => setOffset(page * limit)} 
                            className='paginationNumbers'
                        >
                            {page + 1}
                        </div>
                    )
                })}
            </div> 
        </div>
    );
}
 
export default PetList;
