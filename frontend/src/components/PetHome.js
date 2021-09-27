import React from 'react';
import PetList from './PetList';
import PetSearch from './PetSearch';
import PetAdvancedSearch from './PetAdvancedSearch';

const styles = {
    main: {
        fontFamily: '"Poppins", sans-serif',
        background: '#B0F0EB',
        overflow: 'hidden'
    }
}

const PetHome = () => {
    return (  
        <main style={styles.main}>
            <section>
                <PetSearch />
                <PetAdvancedSearch />
                <PetList />
            </section>
        </main>
    );
}
 
export default PetHome;
