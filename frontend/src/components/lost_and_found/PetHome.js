import React from 'react';
import PetList from './PetList';
import PetSearch from './PetSearch';
import PetAdvancedSearch from './PetAdvancedSearch';


const PetHome = () => {
    return (  
        <main className='petMain'>
            <section>
                {/* FIX PETSEARCH AND PETADVANCEDSEARCH COMPONENTS */}
                {/* <PetSearch />
                <PetAdvancedSearch /> */}
                <PetList />
            </section>
        </main>
    );
}
 
export default PetHome;
