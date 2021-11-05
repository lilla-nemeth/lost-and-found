import React, { useContext } from 'react';
import { AppStateContext } from '../../contexts/AppStateContext';
import PetListCard from '../generic/PetListCard';

const PetList = () => {
    const { pets } = useContext(AppStateContext);

    let DEBUG = false;

    return (  
        <>
            <div className='petContainer'>
                <h1 className='lostAndFoundHeadline'>Lost and Found Pets</h1>
                    {pets.map(pet => {
                            return (
                                <PetListCard key={pet.id} pet={pet}/>
                            );
                        })
                    }
            </div>
        </>
    );
}
 
export default PetList;
