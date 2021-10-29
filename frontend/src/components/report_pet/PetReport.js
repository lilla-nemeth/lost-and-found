import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { AppStateContext } from '../../contexts/AppStateContext';
import createHistory from 'history/createBrowserHistory';
import { isFieldRequired } from '../HelperFunctions.js';
import PetReportOptionalData from './PetReportOptionalData';
import { ReactComponent as ArrowDown} from '../../assets/icons/togglearrow.svg';

// generic components:
import RadioButton from '../generic/RadioButton';
import TextInput from '../generic/TextInput';
import TextArea from '../generic/TextArea';

import ImageUpload from './ImageUpload';
import DragnDropZone from './DragnDropZone';
import LocationSearch from './LocationSearch';
import MapboxMap from './MapboxMap';
// import DropZoneTest from './DropZoneTest';


// petstatusOptions -> reunited option comes later with post editing:

const PetReport = () => {
    const [preview, setPreview] = useState(null);
    const [status, setStatus] = useState('');
    const [files, setFiles] = useState([]);
    const [location, setLocation] = useState('');
    const [species, setSpecies] = useState('');
    const [description, setDescription] = useState('');

    const [optionalInputs, setOptionalInputs] = useState({
        display: 'hideInputs',
    });

    const [size, setSize] = useState('');
    const [breed, setBreed] = useState('');
    const [sex, setSex] = useState('');
    const [colors, setColors] = useState([]);
    const [age, setAge] = useState('');
    const [uniquefeature, setUniquefeature] = useState('');

    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const [loader, setLoader] = useState(true);

    const { token } = useContext(AuthContext);
    const { reportPet, fetchPets, limit, offset, setPets, getAllPets, setTotal } = useContext(AppStateContext);

    let DEBUG = false;

    let disabled = !status || !location || !species || !description || !preview;

    let required = true;


    function handleSubmit(event) {
        event.preventDefault();

        if (DEBUG) console.log('files - PetReport', files);
        if (DEBUG) console.log('disabled before handleSubmit', disabled)

        
        if (!disabled) {
            if (DEBUG) console.log('handleSubmit disabled', disabled)
            reportPet({
                token,
                img: files,
                petstatus: status,
                petlocation: location,
                species,
                petsize: size,
                breed,
                sex,
                color: colors,
                age,
                uniquefeature,
                postdescription: description,
                successCallback: res => {
            
                    fetchPets({
                        limit,
                        offset,
                        successCallback: res => {
                            setPets(res.data);
                            setLoader(false);
                            getAllPets({
                                successCallback: res => {
                                    setTotal(Number(res.data));
                                }
                            })
                        }
                    })
            
                    if (DEBUG) console.log('res from PetReport')
                    setSuccessMsg(res)
                    setSize('')
                    setStatus('')
                    setSpecies('')
                    setBreed('')
                    setSex('')
                    setColors('')
                    setAge('')
                    setUniquefeature('')
                    setErrorMsg('')
                    setLocation('')
                    setDescription('')
                    setPreview('')
                },
                successTimeout: () => (setTimeout(() => {
                    setSuccessMsg('');
                }, 5000)),
                // errorCallback: err => console.log('err from PetReport', err),
                // errorCallback: err => setErrorMsg(err.data.msg),
                errorCallback: err => console.log(err),
                errorTimeout: () => (setTimeout(() => {
                    setErrorMsg('');
                }, 5000))
            });
        } 

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

    {/* remove the map refreshing whenever input event is active */}
    {/* <MapboxMap /> */}
    
    {/* if I'll use Mapbox API and convert the input into a search bar */}
    {/* combine these parameters into 1 searchbar OR 
    separate them to several input fields: municipality, zip, district, street */}

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
                        <h2 className='formHeadline'>Report Pet</h2>
                        <form 
                            method='POST' 
                            onSubmit={handleSubmit}
                            encType='multipart/form-data' 
                        >
                            <div className='filterBox'>
                                <h2 className='categoryHeadline'>Status {isFieldRequired(required)}</h2>
                                <ul className='radioList'>
                                    <RadioButton 
                                        id={'lost'} 
                                        name={'status'} 
                                        value={'lost'} 
                                        checked={status === 'lost'} 
                                        onChange={event => setStatus(event.target.value)} 
                                        labelFor={'lost'} 
                                        labelName={'Lost'}
                                    />
                                    <RadioButton 
                                        id={'found'} 
                                        name={'status'} 
                                        value={'found'} 
                                        checked={status === 'found'} 
                                        onChange={event => setStatus(event.target.value)} 
                                        labelFor={'found'} 
                                        labelName={'Found'}  
                                    />
                                </ul>
                            </div>
                               {/* <DragnDropZone files={files} setFiles={setFiles}/> */}
                               <ImageUpload files={files} setFiles={setFiles} preview={preview} setPreview={setPreview} />
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
                                    <TextInput 
                                        id={'otherSpecies'}
                                        name={'species'}
                                        type={'text'}
                                        value={species === 'dog' || species === 'cat' ? '' : species}
                                        placeholder={'Other'}
                                        onChange={event => setSpecies(event.target.value)}
                                    />
                                </ul>
                            </div>                   
                            <div className='filterBox'> 
                                <h2 className='categoryHeadline'>Location {isFieldRequired(required)}</h2>
                                <TextInput 
                                    id={'location'}
                                    name={'location'}
                                    type={'text'}
                                    value={location}
                                    placeholder={'Location'}
                                    onChange={event => setLocation(event.target.value)}
                                />
                            </div>
                            <TextArea 
                                headlineName={`Description ${isFieldRequired(required)}`}
                                id={'description'} 
                                name={description} 
                                value={description} 
                                placeholder={'Description'} 
                                rows={'6'}
                                cols={'10'}
                                onChange={event => setDescription(event.target.value)} 
                            />
                            { optionalInputs.display === 'hideInputs' ? errorSuccessMessage : '' }
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
                                optionalInputs={optionalInputs} 
                                style={{zIndex: 1}}
                            />
                            { optionalInputs.display === 'showInputs' ? errorSuccessMessage : '' }
                            <div>
                                <button
                                    className={disabled ? 'formButtonInactive' : 'formButton'}
                                    disabled={disabled}
                                >
                                        Report
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
        );
}
 
export default PetReport;

