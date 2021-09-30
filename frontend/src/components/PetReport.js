import React, { useContext, useState } from 'react';
import DragnDropZone from './DragnDropZone';
import { ReactComponent as ArrowDown} from '../assets/icons/togglearrow.svg'
import LocationSearch from './LocationSearch';
import MapboxMap from './MapboxMap';
import RadioButton from './generic/RadioButton';
import PetReportOptionalData from './PetReportOptionalData';
import { ApiContext } from '../contexts/ApiContext';
import createHistory from 'history/createBrowserHistory';
import TextInput from './generic/TextInput';
import TextArea from './generic/TextArea';
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
        padding: '90px'
    },

}

// statusOptions -> reunited option comes later with post editing:

const PetReport = () => {
    const [status, setStatus] = useState('');
    const [location, setLocation] = useState('');
    const [species, setSpecies] = useState('');
    const [description, setDescription] = useState('');

    // Show/hide additional data:
    const [optionalInputs, setOptionalInputs] = useState({
        display: 'hideInputs',
    });

    // Optional Data:
    const [size, setSize] = useState('');
    const [breed, setBreed] = useState('');
    const [sex, setSex] = useState('');
    const [colors, setColors] = useState([]);
    const [age, setAge] = useState('');
    const [uniquefeature, setUniquefeature] = useState('');

    // success/error messages
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isRequired, setIsRequired] = useState(false);

    const { reportPet } = useContext(ApiContext);

    let DEBUG = true;

    if (DEBUG) console.log(colors);

    function handleSubmit(event) {
        event.preventDefault();

        reportPet({
            petstatus: status,
            petlocation: location,
            species,
            size,
            breed,
            sex,
            color: colors,
            age,
            uniquefeature,
            postdescription: description,
            successMsgCallback: res => {
                setSuccessMsg(res);
                console.log(res)
                setSize('');
                setStatus('');
                setSpecies('');
                setBreed('');
                setSex('');
                setColors('');
                setAge('');
                setUniquefeature('');
                setSuccessMsg('');
                setErrorMsg('');
                setLocation('');
                setDescription('');
                //TODO hook for removing image
            },
            errorCallback: err => console.log(err),
            // errorTimeout: () => (setTimeout(() => {
                //     setErrorMsg('');
                // }, 5000))
            
            })

        }

    createHistory().replace('/reportpet');


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

    return (  
        <main style={styles.main}>
            <section style={styles.section}>
            <div className='formBox'>
                    <h2 className='formHeadline'>Report Pet</h2>
                    <form 
                        method='POST' 
                        onSubmit={handleSubmit}
                    >
                        <div className='message'>
                            <p className='errorMessage'>{errorMsg}</p>
                            <p className='successMessage'>{successMsg}</p>
                        </div>
                        <div className='filterBox'>
                            <h2 className='categoryHeadline'>Status</h2>
                            <ul className='radioList'>
                                <RadioButton 
                                    id={'lost'} 
                                    name={'status'} 
                                    value={'lost'} 
                                    checked={status === 'lost'} 
                                    onChange={event => setStatus(event.target.value)} 
                                    labelFor={'lost'} 
                                    labelName={'Lost'}
                                    // required={!isRequired}  
                                />
                                <RadioButton 
                                    id={'found'} 
                                    name={'status'} 
                                    value={'found'} 
                                    checked={status === 'found'} 
                                    onChange={event => setStatus(event.target.value)} 
                                    labelFor={'found'} 
                                    labelName={'Found'}
                                    // required={!isRequired}  
                                />
                            </ul>
                        </div>
                           <DragnDropZone />
                           {/* <DropZoneTest /> */}
                        <div className='filterBox'> 
                            <h2 className='categoryHeadline'>Species</h2>
                            <ul className='radioList'>
                                <RadioButton 
                                    id={'dog'} 
                                    name={'species'} 
                                    value={'dog'} 
                                    checked={species === 'dog'} 
                                    onChange={event => setSpecies(event.target.value)} 
                                    labelFor={'dog'} 
                                    labelName={'Dog'} 
                                    // required={!isRequired}
                                />
                                <RadioButton 
                                    id={'cat'} 
                                    name={'species'} 
                                    value={'cat'} 
                                    checked={species === 'cat'} 
                                    onChange={event => setSpecies(event.target.value)} 
                                    labelFor={'cat'} 
                                    labelName={'Cat'} 
                                    // required={!isRequired}
                                />
                                <TextInput 
                                    id={'otherSpecies'}
                                    name={'species'}
                                    value={species === 'dog' || species === 'cat' ? '' : species}
                                    placeholder={'Other'}
                                    onChange={event => setSpecies(event.target.value)}
                                    // required={!isRequired}
                                />
                            </ul>
                        </div>  

                        {/* if I'll use Mapbox API and convert the input into a search bar */}
                        {/* combine these parameters into 1 searchbar OR 
                        separate them to several input fields: municipality, zip, district, street */}
                        
                        <div className='filterBox'> 
                            <h2 className='categoryHeadline'>Location</h2>
                            <TextInput 
                                id={'location'}
                                name={'location'}
                                value={location}
                                placeholder={'Location'}
                                onChange={event => setLocation(event.target.value)}
                                // required={!isRequired}
                            />
                        </div>
                        
                        {/* <LocationSearch /> */}

                        {/* FIX THAT: remove the map refreshing whenever input event is active */}
                        {/* <MapboxMap /> */}

                        <TextArea 
                            headlineName={'Description'}
                            id={'description'} 
                            name={description} 
                            value={description} 
                            placeholder={'Description'} 
                            rows={'6'}
                            cols={'10'}
                            onChange={event => setDescription(event.target.value)} 
                            // required={!isRequired}
                        />
                        <div className='optionalButton' onClick={() => showOptionalInputs()}>
                                Optional Data
                            <div className='arrowDown'>
                                <ArrowDown style={{height: '16px'}}/>
                            </div>
                        </div>
                        <PetReportOptionalData 
                            size={size} 
                            setSize={setSize} 
                            breed={breed} 
                            setBreed={setBreed} 
                            sex={sex} 
                            setSex={setSex} 
                            colors={colors} 
                            setColors={setColors} 
                            age={age} 
                            setAge={setAge} 
                            uniquefeature={uniquefeature} 
                            setUniquefeature={setUniquefeature} 
                            // isRequired={isRequired} 
                            optionalInputs={optionalInputs} 
                            style={{zIndex: 1}}
                        />
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

