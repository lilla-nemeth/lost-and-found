import React, { useState, useContext } from 'react';
import { ApiContext } from '../contexts/ApiContext';
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg';


const styles = {
    categoryHeadline: {
        padding: '45px 0px 15px',
    }
}

const LocationSearch = () => {
    const [search, setSearch] = useState('');

    const { searchWord } = useContext(ApiContext);

    let DEBUG = true;


    function handleChange(event) {
        setSearch(event.target.value);
    }


    return (  
        <>
          <h2 style={styles.categoryHeadline}>Location</h2>
            <div className='searchBox'>
                <input  className='searchInput'
                        id='search' 
                        type='search' 
                        placeholder='City, Region or Zip' 
                        value={search} 
                        onChange={handleChange} 
                />
                <button className='searchButton'>
                    <SearchIcon/>
                </button>
            </div>
        </>
    );
}
 
export default LocationSearch;