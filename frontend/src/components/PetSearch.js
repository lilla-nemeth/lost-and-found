import React, { useState } from 'react';
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg'

const styles = {
    searchBox: {
        background: 'rgba(255,255,255,0.7)', 
        marginBottom: '25px', 
        padding: '50px', 
        maxWidth: 'fit-content',
        borderRadius: '25px', 
        boxShadow: '7px 12px 24px -8px rgba(0,0,0,0.40)',
    },
    searchForm: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    errorMessageBox: {
        padding: '0 25px 16px',
        textAlign: 'right',   
    },
    speciesCategory: {
        paddingBottom: '15px',
    },
    radioList: {
        display: 'flex',
    }
}

const PetSearchBox = () => {
    const [input, setInput] = useState('');

    let DEBUG = true;

    function handleChange(event) {
        setInput(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    // Get location data (search box) from the following columns:
    // region
    // municipality
    // zip

    return (  
        <div>
            <div style={styles.searchBox}>
                <form style={styles.searchForm} onSubmit={handleSubmit}>
                    <h2 style={styles.speciesCategory}>Location</h2>
                    <div style={{display: 'flex'}}>
                        <input className='searchInput' type='search' placeholder='City, Region or Zip' value={input} onChange={handleChange} />
                        <button className='searchButton'><SearchIcon style={{fill: 'white', height: '20px'}}/></button>
                    </div>
                    <div style={{padding: '25px 0'}}>
                        {/* SPECIES */}
                        <h2 style={styles.speciesCategory}>Species</h2>
                        <ul style={styles.radioList}>
                            <li style={styles.radioListElements}>
                                <input type='radio' id='dog' name='species' />
                                <label for='dog'>Dog</label>
                                <div class="radioCheck"><div class="radioCheckInside"></div></div>
                            </li>
                            <li>
                                <input type='radio' id='cat' name='species' />
                                <label for='cat'>Cat</label>
                                <div class="radioCheck"><div class="radioCheckInside"></div></div>
                            </li>
                            <li>
                                <input type='radio' id='other' name='species' />
                                <label for='other'>Other</label>
                                <div class="radioCheck"><div class="radioCheckInside"></div></div>
                            </li>
                        </ul>
                    </div> 
                    <div style={{padding: '25px 0'}}>
                        {/* STATUS */}
                        <h2 style={styles.speciesCategory}>Status</h2>
                        <ul style={styles.radioList}>
                            <li style={styles.radioListElements}>
                                <input type='checkbox' id='lost' name='status' />
                                <label for='lost' className='checkboxContainer'>
                                    Lost
                                </label>
                                <div class="checkboxCheck"><div class="checkboxCheckInside"></div></div>
                            </li>
                            <li>
                                <input type='checkbox' id='found' name='status' />
                                <label for='found' className='checkboxContainer'>
                                    Found
                                </label>
                                <div class="checkboxCheck">
                                    <div class="checkboxCheckInside">
                                    </div>
                                </div>
                            </li>
                            <li>
                                <input type='checkbox' id='reunited' name='status' />
                                <label for='reunited' className='checkboxContainer'>
                                    Reunited
                                </label>
                                <div class="checkboxCheck">
                                    <div class="checkboxCheckInside">
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div> 
                </form>
            </div>
            <div style={styles.errorMessageBox}>
                <p>Place of Error Message</p>
            </div>
        </div>
    );
}
 
export default PetSearchBox;
