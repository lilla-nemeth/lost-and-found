import React, { useEffect, useState } from 'react';
import PetList from './PetList';
import PetSearchBox from './PetSearchBox';
import PetSortingButtons from './PetSortingButtons';

const styles = {
    main: {
        fontFamily: '"Poppins", sans-serif',
        background: '#B0F0EB',
        overflow: 'hidden'
    }
}

const PetLostAndFound = () => {
    return (  
        <main style={styles.main}>
            <section>
                <PetSearchBox />
                <PetSortingButtons />
                <PetList />
            </section>
        </main>
    );
}
 
export default PetLostAndFound;
