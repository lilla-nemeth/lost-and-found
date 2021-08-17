import React, { useEffect, useState } from 'react';
import axios from 'axios';


const PetList = () => {

const [pets, setPets] = useState([]);
// we get string and we need to convert it to number before saving into the state:
const [total, setTotal] = useState(0);
// the default skip: 
const [offset, setOffset] = useState(0);

let limit = 6;

    useEffect(() => {
        console.log(limit, offset)
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
        .then((res) => setPets(res.data))
        .then(() => {
            axios(optionsTotal) 
            .then((res) => setTotal(Number(res.data)))
            // .then((res) => console.log(res.data))
        })
        .catch((err) => console.log(err));
    },[offset]);

    let numberOfPages = total / limit;  

    function numberIncreases () {
        let numberArr = []

        for (let i = 0; i < numberOfPages; i++) {
            numberArr.push(i);
        }
        // console.log(numberOfPages);
        return numberArr;
    }

    return (  
        <>
        {pets.map(pet => {
            return (
                <div style={{background: '#eee', marginBottom: '2px', padding: '10px'}} key={pet.id}>
                    {pet.id}
                </div>
            )
        })}
        
        {/* <p>{numberOfPages}</p> */}
        <div style={{display: 'flex'}}>{numberIncreases().map(page => {
                return (
                    <div 
                        onClick={() => setOffset(page * limit)} 
                        style={{padding: '10px', border: '1px solid red', cursor: 'pointer'}}
                    >
                        {page + 1}
                    </div>
                )
            })}
        </div>
        </>
    );
}
 
export default PetList;
