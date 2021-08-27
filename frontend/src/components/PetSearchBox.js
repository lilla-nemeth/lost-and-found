import React, { useState } from 'react';
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg'

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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchInput: {
        padding: '16px',
        width: '740px',
        background: '#b7dfdb',
        border: 'none',
        font: '300 15px/1.2 "Poppins", sans-serif',
    },
    searchButton: {
        width: '50px',
        height: '50px',
        background: '#47a39c',
        border: 'none',
        cursor: 'pointer',
        font: '300 15px/1.2 "Poppins", sans-serif',
    },
    errorMessageBox: {
        padding: '0 25px 16px',
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
        <div>
            <div style={styles.searchBox}>
                <form style={styles.searchForm} onSubmit={handleSubmit}>
                    <input style={styles.searchInput} type='search' placeholder='Search with keywords' value={input} onChange={handleChange} />
                    <button style={styles.searchButton}><SearchIcon style={{fill: 'white', heigh: '20px'}}/></button>
                </form>
            </div>
            <div style={styles.errorMessageBox}>
                <p>Place of Error Message</p>
            </div>
        </div>
    );
}
 
export default PetSearchBox;
