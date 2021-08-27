import React from 'react';
import PetList from './PetList';
import PetSearch from './PetSearch';
import PetAdvancedSearch from './PetAdvancedSearch';

const styles = {
    main: {
        fontFamily: '"Poppins", sans-serif',
        background: '#B0F0EB',
        overflow: 'hidden'
    },
    section: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    }
}

const PetHome = () => {
    return (  
        <main style={styles.main}>
            <section style={styles.section}>
                <PetSearch />
                <PetAdvancedSearch />
                <PetList />
            </section>
        </main>
    );
}
 
export default PetHome;
