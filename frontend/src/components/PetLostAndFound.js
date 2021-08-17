import React, { useEffect, useState } from 'react';
import PetList from './PetList';
import PetSearchBox from './PetSearchBox';
import PetSortingButtons from './PetSortingButtons';


const PetLostAndFound = () => {
    return (  
        <main>
            <section>
                <PetSearchBox />
                <PetSortingButtons />
                <PetList />
            </section>
        </main>
    );
}
 
export default PetLostAndFound;
