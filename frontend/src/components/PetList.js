import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Sugar from 'sugar';
import Loader from './Loader';
import createHistory from 'history/createBrowserHistory';

const PetList = () => {

    // PetSortingButtons lost and found buttons:
    // if Lost is checked, then show the since info: pets > pet.since
    // if Found is checked, then show the until info: pets > pet.until

    const [pets, setPets] = useState([]);
    // we get string and we need to convert it to number before saving into the state:
    const [total, setTotal] = useState(0);
    // the default skip: 
    const [offset, setOffset] = useState(0);

    // API res: setLoader(true)
    const [loader, setLoader] = useState(true);

    let DEBUG = true;

    let limit = 6;

    // NOTE: put the API part into ApiContext!
     
    useEffect(() => {
        let options = {
            method: 'get',
            // to the frontend find the localhost necessary to add proxy in package.json (frontend folder)
            url: `http://localhost:3003/pets/${limit}/${offset}`,
            mode: 'cors',        
            headers: {
                'Content-Type': 'application/json'
            }
        };
        let optionsTotal = {
            method: 'get',
            // to the frontend find the localhost necessary to add proxy in package.json (frontend folder)
            url: 'http://localhost:3003/pets/total',
            mode: 'cors',        
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios(options)
        .then((res) => {
            setLoader(false);
            setPets(res.data);
        })
        // .then((res) => console.log(res.data))
        .then(() => {
            axios(optionsTotal) 
            .then((res) => setTotal(Number(res.data)))
            // .then((res) => console.log(res.data))
        })
        .catch((err) => console.log(err));
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

    createHistory().replace('/');

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
                                    {pet.addstatus}
                                </div>
                                <div className='petSpecies'>
                                    {pet.species}
                                </div>
                                <div className='petId'>
                                    #{pet.id}
                                </div>
                                <div className='petDate'>
                                    {
                                        pet.addstatus === 'lost' || pet.addstatus === 'found' 
                                        ? 
                                        petStatus(pet.addstatus) + ': ' + convertDate(pet.since) 
                                        : 
                                        petStatus(pet.addstatus) + ': ' + convertDate(pet.until)
                                    }
                                </div>
                                <div className='petPlace'>
                                    {pet.municipality} ({pet.region})
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
