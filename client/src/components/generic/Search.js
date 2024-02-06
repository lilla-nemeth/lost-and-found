import React from 'react';
import TextInput from './TextInput';
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';

const Search = (props) => {
    const { 
        search, 
        setSearch 
    } = props;

    let DEBUG = false;

    return (
        <div className='searchFormSection'>
            <div className='searchFormBox'>
                <h2 className='formHeadline'>Search Pet</h2>
                <div className='searchBox'>
                    <TextInput 
                        id={'search'}
                        name={'search'}
                        type={'search'}
                        value={search}
                        placeholder={'Status, species or location...'}
                        onChange={event => setSearch(event.target.value)}
                    />
                     <button className='searchButton'>
                         <SearchIcon/>
                     </button>
                </div>
            </div>
        </div>
    );
}
 
export default Search;
