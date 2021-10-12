import React, { useState, useContext } from 'react';
import { AppStateContext } from '../../contexts/AppStateContext';
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';

const LocationSearch = () => {
    const [search, setSearch] = useState('');

    const { searchWord } = useContext(AppStateContext);

    let DEBUG = true;


    function handleChange(event) {
        setSearch(event.target.value);
    }


    return (  
        <>
          <h2 className='categoryHeadline'>Location</h2>
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