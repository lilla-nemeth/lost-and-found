import React, { useState } from 'react';

const styles = {
    searchBox: {
        background: 'rgba(255,255,255,0.7)', 
        marginBottom: '25px', 
        padding: '25px', 
        maxWidth: 'fit-content',
        borderRadius: '25px', 
        boxShadow: '7px 12px 24px -8px rgba(0,0,0,0.40)'
    },
    searchForm: {
        width: '300px',
    },
    searchInput: {
        padding: '15px',
    },
    searchButton: {
        padding: '15px',
        cursor: 'pointer'
    }
}

const PetSearchBox = () => {
    const [input, setInput] = useState('');

    function handleChange(event) {
        setInput(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (  
        <div style={styles.searchBox}>
            <form style={styles.searchForm} onSubmit={handleSubmit}>
                <input style={styles.searchInput} type='search' placeholder='Search with keywords' value={input} onChange={handleChange} />
                <button style={styles.searchButton}>Search</button>
            </form>
        </div>
    );
}
 
export default PetSearchBox;
