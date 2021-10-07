import React, { useEffect, useState, useContext } from 'react';
import { ApiContext } from '../../contexts/ApiContext';
import createHistory from 'history/createBrowserHistory';
import Loader from '../generic/Loader';
import { v4 as uuidv4 } from 'uuid';
import Sugar from 'sugar';

const PetList = () => {

    // PetSortingButtons lost and found buttons:
    // if Lost is checked, then show the since info: pets > pet.since
    // if Found is checked, then show the until info: pets > pet.until

    const [pets, setPets] = useState([]);
    // we get string and we need to convert it to number before saving into the state:
    const [total, setTotal] = useState(0);
    // the default skip: 
    const [offset, setOffset] = useState(0);

    const [loader, setLoader] = useState(true);

    // success/error messages
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const { pagination, getAllPets } = useContext(ApiContext);

    let DEBUG = true;

    let limit = 6;

    useEffect(() => {
        pagination({
            limit,
            offset,
            successCallback: res => {
                setLoader(false);
                setPets(res.data);
                getAllPets({
                    successCallback: res => {
                        setSuccessMsg(res.data.msg);
                        setTotal(Number(res.data));
                    }
                })
            },
            errorCallback: err => setSuccessMsg(err.data.msg)
        })
    },[offset]);

    let numberOfPages = total / limit;  


    function numberIncreases() {
        let numberArr = []

        for (let i = 0; i < numberOfPages; i++) {
            numberArr.push(i);
        }
        return numberArr;
    } 

    // convertDate helper function:
    function convertDate(timestamp) {
        let dateBySugar = Sugar.Date.create(timestamp)
        let formattedDateBySugar = Sugar.Date.format(dateBySugar, '{dd}/{MM}/{yyyy}');
        
        return formattedDateBySugar;
    }

    // petStatus helper function:
    function petStatus(status) {
        if (status === 'found') {
            return 'Found'
        } else if (status === 'lost') {
            return 'Lost';
        } else {
            return 'Reunited';
        }
    }

    // lost -> since (in progress cases)
    // found -> since (in progress cases)
    // reunited -> until (ready to close cases)

    createHistory().replace('/lostandfound');

    if (loader) {
        return (
            <Loader />
        );
    }

    {/* <button className='formButton'>View Pet</button> */}

    return (  
        <div className='petContainer'>
            <h1 className='lostAndFoundHeadline'>Lost and Found Pets</h1>
        {pets.map(pet => {
            return (
                    <div className='petCard' key={pet.id}>
                        <div className='petCardInner'>
                            <div className='petListPicture'>
                                Place of Picture
                            </div>
                            <div className='petTextBox'>
                                <div className='petStatus'>
                                    {pet.petstatus}
                                </div>
                                <div className='petSpecies'>
                                    {pet.species}
                                </div>
                                <div className='petId'>
                                    #{pet.id}
                                </div>
                                <div className='petDate'>
                                    {
                                        pet.petstatus === 'lost' || pet.petstatus === 'found' 
                                        ? 
                                        petStatus(pet.petstatus) + ': ' + convertDate(pet.since) 
                                        : 
                                        petStatus(pet.petstatus) + ': ' + convertDate(pet.until)
                                    }
                                </div>
                                <div className='petPlace'>
                                    {pet.petlocation}
                                </div>
                            </div>
                        </div>
                    </div>
            )
        })} 

            <div className='pagination'>{numberIncreases().map(page => {
                    return (
                        <div 
                            key={uuidv4()}
                            onClick={() => setOffset(page * limit)} 
                            className='paginationNumbers'
                        >
                            {page + 1}
                        </div>
                    )
                })}
            </div> 
        </div>
    );
}
 
export default PetList;
