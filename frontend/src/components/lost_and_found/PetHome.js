import React from 'react';
import PetList from './PetList';
import PetSearch from './unused/PetSearch';


const PetHome = () => {
    return (  
        <main className='petMain'>
            <section>
                {/* pet search API comes later */}
                {/* <PetSearch /> */}
                <PetList />
            </section>
        </main>
    );
}
 
export default PetHome;
