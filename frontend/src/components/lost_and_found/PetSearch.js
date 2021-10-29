import React, { useState } from 'react';
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';
import { isFieldRequired, changeCheckboxValue } from '../HelperFunctions.js';
import { ReactComponent as ArrowDown} from '../../assets/icons/togglearrow.svg';

// generic components:
import TextInput from '../generic/TextInput';
import RadioButton from '../generic/RadioButton';
import Checkbox from '../generic/Checkbox';
import TextArea from '../generic/TextArea';

const PetSearchBox = () => {
    const [location, setLocation] = useState('');
    const [status, setStatus] = useState('');
    const [species, setSpecies] = useState('');

    const [optionalInputs, setOptionalInputs] = useState({
        display: 'hideInputs',
    });

    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    // PetAdvancedSearch (optional):
    // const [description, setDescription] = useState('');
    // const [size, setSize] = useState('');
    // const [breed, setBreed] = useState('');
    // const [sex, setSex] = useState('');
    // const [colors, setColors] = useState([]);
    // const [age, setAge] = useState('');
    // const [uniquefeature, setUniquefeature] = useState('');

    let DEBUG = true;

    let disabled = !status || !location || !species;

    let required = true;

    function handleSubmit(event) {
        event.preventDefault();

        // place for petSearch API
    }

    function showOptionalInputs() {
        if (optionalInputs.display === 'hideInputs') {
            setOptionalInputs({
                display: 'showInputs'
            }) 
        } else {
            setOptionalInputs({
                display: 'hideInputs'
            })
        }
    }

    const errorSuccessMessage = (
        <div className='message'>
            <p className='errorMessage'>{errorMsg}</p>
            <p className='successMessage'>{successMsg}</p>
        </div>
    );

    return (  
        <main className='formMain'>
            <section className='formSection'>
            <div className='formBox'>
                    <h2 className='formHeadline'>Search Pet</h2>
                    <form 
                        method='POST' 
                        onSubmit={handleSubmit}
                    >
                        <div className='filterBox'>
                            <h2 className='categoryHeadline'>Status {isFieldRequired(required)}</h2>
                            <ul className='radioList'>
                                <Checkbox
                                    id={'lost'} 
                                    name={'status'} 
                                    value={'lost'} 
                                    checked={status.includes('lost')} 
                                    onChange={() => changeCheckboxValue(status, setStatus, 'lost')}
                                    labelFor={'lost'} 
                                    labelName={'Lost'}
                                />
                                <Checkbox
                                    id={'found'} 
                                    name={'status'} 
                                    value={'found'} 
                                    checked={status.includes('found')} 
                                    onChange={() => changeCheckboxValue(status, setStatus, 'found')}
                                    labelFor={'found'} 
                                    labelName={'Found'}
                                />
                                <Checkbox
                                    id={'reunited'} 
                                    name={'status'} 
                                    value={'reunited'} 
                                    checked={status.includes('reunited')} 
                                    onChange={() => changeCheckboxValue(status, setStatus, 'reunited')}
                                    labelFor={'reunited'} 
                                    labelName={'Reunited'}
                                />
                            </ul>
                        </div>
                        <div className='filterBox'> 
                            <h2 className='categoryHeadline'>Species {isFieldRequired(required)}</h2>
                            <ul className='radioList'>
                                <RadioButton 
                                    id={'dog'} 
                                    name={'species'} 
                                    value={'dog'} 
                                    checked={species === 'dog'} 
                                    onChange={event => setSpecies(event.target.value)} 
                                    labelFor={'dog'} 
                                    labelName={'Dog'} 
                                />
                                <RadioButton 
                                    id={'cat'} 
                                    name={'species'} 
                                    value={'cat'} 
                                    checked={species === 'cat'} 
                                    onChange={event => setSpecies(event.target.value)} 
                                    labelFor={'cat'} 
                                    labelName={'Cat'} 
                                />
                                <RadioButton 
                                    id={'other'} 
                                    name={'species'} 
                                    value={'other'} 
                                    checked={species === 'other'} 
                                    onChange={event => setSpecies(event.target.value)} 
                                    labelFor={'other'} 
                                    labelName={'Other'} 
                                />
                            </ul>
                        </div>
                        <div className='filterBox'>
                            <h2 className='categoryHeadline'>Location {isFieldRequired(required)}</h2>
                            <div className='searchBox'>
                                <TextInput 
                                    id={'location'}
                                    name={'location'}
                                    type={'search'}
                                    value={location}
                                    placeholder={'Location'}
                                    onChange={event => setLocation(event.target.value)}
                                />
                                 <button className='searchButton'>
                                     <SearchIcon/>
                                 </button>
                            </div>
                        </div>            

                        {/* { optionalInputs.display === 'hideInputs' ? errorSuccessMessage : '' }
                            <div className='optionalButton' onClick={() => showOptionalInputs()}>
                                    Advanced Search
                                <div className='arrowDown'>
                                    <ArrowDown style={{height: '16px'}}/>
                                </div>
                            </div> */}

                        {/* Reference for advanced search: */}
                        {/* Place for PetAdvancedSearch component */}

                        {/* { optionalInputs.display === 'showInputs' ? errorSuccessMessage : '' }   */}

                        <div>
                            <button
                                className={disabled ? 'formButtonInactive' : 'formButton'}
                                disabled={disabled}
                            >
                                Search
                            </button>
                        </div>      
                    </form>
                </div>
            </section>
        </main>
    );
}
 
export default PetSearchBox;
