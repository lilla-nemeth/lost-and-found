import React, { useState } from 'react';
import DragnDropZone from './DragnDropZone';
import { ReactComponent as ArrowDown} from '../assets/icons/togglearrow.svg'
import LocationSearch from './LocationSearch';
import MapboxMap from './MapboxMap';
import RadioButton from './generic/RadioButton';
import Checkbox from './generic/Checkbox';
// import DropZoneTest from './DropZoneTest';


const styles = {
    main: {
        fontFamily: '"Poppins", sans-serif',
        background: '#B0F0EB',
        overflow: 'hidden',
    },
    section: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    categoryHeadline: {
        padding: '45px 0px 15px',
    }
} 

// const regionOptions = {
//     01: 'Lapland',
//     02: 'North Ostrobothnia',
//     03: 'Kainuu',
//     04: 'North Karelia',
//     05: 'Northern Savonia',
//     06: 'Southern Savonia',
//     07: 'South Karelia',
//     08: 'Central Finland',
//     // ... maybe this offer way too many options :/ - 
//     // only municipalities of North Ostrobothnia?
// }

// statusOptions -> reunited option comes later with post editing:
const statusOptions = ['lost', 'found']
const speciesOptions = ['dog', 'cat', 'other']
const sizeOptions = ['small', 'medium', 'large'];
const sexOptions = ['male', 'female', 'unknown'];
const colorOptions = ['black', 'brown', 'grey', 'white'];
const ageOptions = ['juvenile', 'adolescent', 'adult', 'senior', 'unknown'];


const PetReport = () => {
    const [status, setStatus] = useState(statusOptions);
    const [region, setRegion] = useState('');
    const [municipality, setMunicipality] = useState('');
    const [zip, setZip] = useState('');
    const [district, setDistrict] = useState('');
    const [street, setStreet] = useState('');
    const [species, setSpecies] = useState(speciesOptions);
    const [size, setSize] = useState(sizeOptions);
    const [breed, setBreed] = useState('');
    const [sex, setSex] = useState(sexOptions);
    const [color, setColor] = useState(colorOptions);
    const [age, setAge] = useState(ageOptions);
    const [uniquefeature, setUniquefeature] = useState('');
    const [description, setDescription] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    // for checkbox:
    const [isChecked, setIsChecked] = useState(false);
    // radio useState input will be the response data (from ApiContext) - 
    // -> remove the hard coded 'lost' string, change to pet array with objects
    const [radio, setRadio] = useState('lost');
    const [isRequired, setIsRequired] = useState(false);


    const [optionalInputs, setOptionalInputs] = useState({
        display: 'hideInputs',
    });

    let DEBUG = true;

    // const { reportPet } = useContext(ApiContext);

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

    // place for the function where I call the report api fron ApiContext

    {/* map() the pet data from ApiContext for RadioButton & checkbox data */}
    {/* isChecked={true} - isChecked value will be a hooks with boolean value */}
    {/* 1. test with hard coded data - strings */}
    {/* change the hard coded: radio === lost    to object (from ApiContext) */}

    return (  
        <main style={styles.main}>
            <section style={styles.section}>
            <div className='formBox'>
                    <h2 className='formHeadline'>Report Pet</h2>
                    <form 
                        method='POST' 
                        // onSubmit={handleSubmit}
                    >
                        <div className='filterBox'>
                            <h2 style={styles.categoryHeadline}>Status</h2>
                            <ul className='radioList'>
                                <RadioButton 
                                    id={'lost'} 
                                    name={'status'} 
                                    value={'lost'} 
                                    checked={radio === 'lost'} 
                                    onChange={event => {setRadio(event.target.value)}} 
                                    labelFor={'lost'} 
                                    labelName={'Lost'}
                                    required={!isRequired}  
                                />
                                <RadioButton 
                                    id={'found'} 
                                    name={'status'} 
                                    value={'found'} 
                                    checked={radio === 'found'} 
                                    onChange={event => {setRadio(event.target.value)}} 
                                    labelFor={'found'} 
                                    labelName={'Found'}
                                    required={!isRequired}  
                                />
                            </ul>
                        </div>
                           <DragnDropZone />
                           {/* <DropZoneTest /> */}
                        <div className='filterBox'> 
                            <h2 style={styles.categoryHeadline}>Species</h2>
                            <ul className='radioList'>
                                <RadioButton 
                                    id={'dog'} 
                                    name={'species'} 
                                    value={'dog'} 
                                    checked={radio === 'dog'} 
                                    onChange={event => {setRadio(event.target.value)}} 
                                    labelFor={'dog'} 
                                    labelName={'Dog'} 
                                    required={!isRequired}
                                />
                                <RadioButton 
                                    id={'cat'} 
                                    name={'species'} 
                                    value={'cat'} 
                                    checked={radio === 'cat'} 
                                    onChange={event => {setRadio(event.target.value)}} 
                                    labelFor={'cat'} 
                                    labelName={'Cat'} 
                                    required={!isRequired}
                                />
                                <RadioButton 
                                    id={'otherSpecies'} 
                                    name={'species'} 
                                    value={'otherSpecies'} 
                                    checked={radio === 'otherSpecies'} 
                                    onChange={event => {setRadio(event.target.value)}} 
                                    labelFor={'otherSpecies'} 
                                    labelName={'Other'}
                                    required={!isRequired} 
                                />
                            </ul>
                        </div>  
                        {/* change later the 'Region' headline to 'Location' 
                        if I'll use Mapbox API and convert the input into a search bar */}
                        {/* combine these parameters into 1 searchbar OR 
                        separate them to several input fields: municipality, zip, district, street */}
                       
                        {/* <div className='filterBox'> 
                            <h2 style={styles.categoryHeadline}>Region</h2>
                            <div className='inputBox'>
                                <input 
                                    className='formInput' 
                                    id='region'
                                    autoComplete='region' 
                                    type='text' 
                                    name='region' 
                                    placeholder='region' 
                                    required 
                                    onChange={event => setRegion(event.target.value)}
                                />
                            </div>
                        </div> */}
                        {/* <LocationSearch /> */}
                        <MapboxMap />
                        <div className='filterBox'> 
                            <h2 style={styles.categoryHeadline}>Description</h2>
                            <div className='inputBox'>
                                {/* NOTE: put textarea tag into a Textarea component - reusability */}
                                <textarea
                                    style={{resize: 'none'}}
                                    className='formInput' 
                                    id='description'
                                    autoComplete='region' 
                                    type='text' 
                                    name='region' 
                                    placeholder='Description' 
                                    rows='6'
                                    cols='10'
                                    required 
                                    onChange={event => setDescription(event.target.value)}
                                >
                                </textarea>
                            </div>
                        </div>
                        <button className='optionalButton' onClick={() => showOptionalInputs()}>
                                Optional Data
                            <div className='arrowDown'>
                                <ArrowDown style={{height: '16px'}}/>
                            </div>
                        </button>
                        <div className={optionalInputs.display}>
                            <div className='filterBox'> 
                                <h2 style={styles.categoryHeadline}>Breed</h2>
                                <div className='inputBox'>
                                    <input 
                                        className='formInput' 
                                        id='breed'
                                        autoComplete='breed' 
                                        type='text' 
                                        name='breed' 
                                        placeholder='breed'
                                        onChange={event => setBreed(event.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='filterBox'> 
                                <h2 style={styles.categoryHeadline}>Size</h2>
                                <ul className='radioList'>
                                    <RadioButton 
                                        id={'small'} 
                                        name={'size'} 
                                        value={'small'} 
                                        checked={radio === 'small'} 
                                        onChange={event => {setRadio(event.target.value)}} 
                                        labelFor={'small'} 
                                        labelName={'Small'}
                                        required={isRequired} 
                                    />
                                    <RadioButton 
                                        id={'medium'} 
                                        name={'size'} 
                                        value={'medium'} 
                                        checked={radio === 'medium'} 
                                        onChange={event => {setRadio(event.target.value)}} 
                                        labelFor={'medium'} 
                                        labelName={'medium'}
                                        required={isRequired} 
                                    />
                                    <RadioButton 
                                        id={'large'} 
                                        name={'size'} 
                                        value={'large'} 
                                        checked={radio === 'large'} 
                                        onChange={event => {setRadio(event.target.value)}} 
                                        labelFor={'large'} 
                                        labelName={'large'} 
                                        required={isRequired} 
                                    />
                                </ul>
                            </div> 
                            <div className='filterBox'> 
                                <h2 style={styles.categoryHeadline}>Sex</h2>
                                <ul className='radioList'>
                                    <RadioButton 
                                        id={'male'} 
                                        name={'sex'} 
                                        value={'male'} 
                                        checked={radio === 'male'} 
                                        onChange={event => {setRadio(event.target.value)}} 
                                        labelFor={'male'} 
                                        labelName={'Male'}
                                        required={isRequired} 
                                    />
                                    <RadioButton 
                                        id={'female'} 
                                        name={'sex'} 
                                        value={'female'} 
                                        checked={radio === 'female'} 
                                        onChange={event => {setRadio(event.target.value)}} 
                                        labelFor={'female'} 
                                        labelName={'Female'}
                                        required={isRequired}
                                    />
                                    <RadioButton 
                                        id={'unknownSex'} 
                                        name={'sex'} 
                                        value={'unknownSex'} 
                                        checked={radio === 'unknownSex'} 
                                        onChange={event => {setRadio(event.target.value)}} 
                                        labelFor={'unknownSex'} 
                                        labelName={'Unknown'}
                                        required={isRequired} 
                                    />
                                </ul>
                            </div> 
                            <div className='filterBox'>
                                <h2 style={styles.categoryHeadline}>Color</h2>
                                <ul className='radioList'>
                                    {/* FIX THE CHECKBOX */}
                                    <Checkbox
                                        id={'black'} 
                                        name={'color'} 
                                        value={'black'} 
                                        checked={isChecked} 
                                        onChange={event => {setIsChecked(event.target.checked)}} 
                                        labelFor={'black'} 
                                        labelName={'Black'}
                                        // something required...?
                                    />
                                    <Checkbox
                                        id={'brown'} 
                                        name={'color'} 
                                        value={'brown'} 
                                        checked={isChecked} 
                                        onChange={event => {setIsChecked(event.target.checked)}} 
                                        labelFor={'brown'} 
                                        labelName={'Brown'}  
                                    />
                                    <Checkbox
                                        id={'cream'} 
                                        name={'color'} 
                                        value={'cream'} 
                                        checked={isChecked} 
                                        onChange={event => {setIsChecked(event.target.checked)}} 
                                        labelFor={'cream'} 
                                        labelName={'Cream'}  
                                    />
                                    <Checkbox
                                        id={'grey'} 
                                        name={'color'} 
                                        value={'grey'} 
                                        checked={isChecked} 
                                        onChange={event => {setIsChecked(event.target.checked)}} 
                                        labelFor={'grey'} 
                                        labelName={'Grey'}  
                                    />
                                    <Checkbox
                                        id={'red'} 
                                        name={'color'} 
                                        value={'red'} 
                                        checked={isChecked} 
                                        onChange={event => {setIsChecked(event.target.checked)}} 
                                        labelFor={'red'} 
                                        labelName={'Red'}  
                                    />
                                    <Checkbox
                                        id={'white'} 
                                        name={'color'} 
                                        value={'white'} 
                                        checked={isChecked} 
                                        onChange={event => {setIsChecked(event.target.checked)}} 
                                        labelFor={'white'} 
                                        labelName={'White'}  
                                    />
                                    <Checkbox
                                        id={'otherColor'} 
                                        name={'color'} 
                                        value={'otherColor'} 
                                        checked={isChecked} 
                                        onChange={event => {setIsChecked(event.target.checked)}} 
                                        labelFor={'otherColor'} 
                                        labelName={'Other'}  
                                    />
                                </ul>
                            </div>
                            <div className='filterBox'>
                                <h2 style={styles.categoryHeadline}>Age</h2>
                                <ul className='radioList'>
                                    <RadioButton 
                                        id={'juvenile'} 
                                        name={'age'} 
                                        value={'juvenile'} 
                                        checked={radio === 'juvenile'} 
                                        onChange={event => {setRadio(event.target.value)}} 
                                        labelFor={'juvenile'} 
                                        labelName={'Juvenile'}
                                        required={isRequired} 
                                    />
                                    <RadioButton 
                                        id={'adolescent'} 
                                        name={'age'} 
                                        value={'adolescent'} 
                                        checked={radio === 'adolescent'} 
                                        onChange={event => {setRadio(event.target.value)}} 
                                        labelFor={'adolescent'} 
                                        labelName={'Adolescent'}
                                        required={isRequired} 
                                    />
                                    <RadioButton 
                                        id={'adult'} 
                                        name={'age'} 
                                        value={'adult'} 
                                        checked={radio === 'adult'} 
                                        onChange={event => {setRadio(event.target.value)}} 
                                        labelFor={'adult'} 
                                        labelName={'Adult'}
                                        required={isRequired} 
                                    />
                                    <RadioButton 
                                        id={'senior'} 
                                        name={'age'} 
                                        value={'senior'} 
                                        checked={radio === 'senior'} 
                                        onChange={event => {setRadio(event.target.value)}} 
                                        labelFor={'senior'} 
                                        labelName={'Senior'}
                                        required={isRequired} 
                                    />
                                    <RadioButton 
                                        id={'unknownAge'} 
                                        name={'age'} 
                                        value={'unknownAge'} 
                                        checked={radio === 'unknownAge'} 
                                        onChange={event => {setRadio(event.target.value)}} 
                                        labelFor={'unknownAge'} 
                                        labelName={'Unknown'}
                                        required={isRequired} 
                                    />
                                </ul>
                            </div>
                            <div className='filterBox'> 
                                <h2 style={styles.categoryHeadline}>Unique feature</h2>
                                <div className='inputBox'>
                                    <input 
                                        className='formInput' 
                                        id='uniqueFeature'
                                        autoComplete='unique feature' 
                                        type='text' 
                                        name='uniqueFeature' 
                                        placeholder='unique feature'
                                        onChange={event => setUniquefeature(event.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='message'>
                            <p className='errorMessage'>{errorMsg}</p>
                            <p className='successMessage'>{successMsg}</p>
                        </div>
                        <div>
                            <button className='formButton'>Report</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}
 
export default PetReport;

