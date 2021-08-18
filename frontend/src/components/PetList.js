import React, { useEffect, useState } from 'react';
import axios from 'axios';

const styles = {

    petCard: {
        background: 'rgba(255,255,255,0.7)', 
        marginBottom: '25px', 
        padding: '50px', 
        maxWidth: 'fit-content',
        borderRadius: '25px', 
        boxShadow: '7px 12px 24px -8px rgba(0,0,0,0.40)'
    },

    petCardInner: {
        display: 'flex',
        height: '400px',
        justifyContent: 'space-between'
    },

    petPicture: {
        width: '300px',  
        // height: '250px',
        border: '2px solid black',
        cursor: 'pointer', 
        position: 'relative',

        // delete later, or add to img tag:
        background: '#999', 
        objectFit: 'cover',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'block',
    },

    petTextBox: {
        border: '2px solid black',
        padding: '50px',
    },

    // petHeadline: {

    // },

    petStatus: {
        font: '500 15px/1.2',
        textTransform: 'uppercase',
        border: '1px solid black',
        padding: '10px',
        width: 'fit-content',
        // different color for 'lost' and 'found'
    },

    petSpecies: {
        font: '700 32px/1.2 "Poppins", sans-serif',
        fontSize: '35px',
        margin: '40px 0 30px 0'
    },

    petId: {
        margin: '10px 0',
        font: '300 15px/1.2 "Poppins", sans-serif',
    },

    petDate: {
        margin: '10px 0',
        font: '300 15px/1.2 "Poppins", sans-serif',
    },

    petPlace: {
        flexDirection: 'row',
        margin: '10px 0',
        font: '300 15px/1.2 "Poppins", sans-serif',
    },

    petProfileButton: {
        font: '400 15px/1.2 "Poppins", sans-serif',
        cursor: 'pointer',
        width: '100%',
        padding: '15px',
        // width: 'fit-content',

    },

    pagination: {
        display: 'flex',
        border: '2px solid black',
        alignItems: 'center',
        justifyContent: 'center',
    },

    paginationNumbers: {
        padding: '15px', 
        background: 'rgba(255,255,255,0.7)',
        margin: '0 5px',
        textAlign: 'center', 
        width: '20px', 
        height: '20px', 
        cursor: 'pointer',
        borderRadius: '30px',
    },

}

const PetList = () => {
// PetSortingButtons lost and found buttons:
// if Lost is checked, then show the since info: pets > pet.since
// if Found is checked, then show the until info: pets > pet.until

// install sugar npm! (date)

const [pets, setPets] = useState([]);
// we get string and we need to convert it to number before saving into the state:
const [total, setTotal] = useState(0);
// the default skip: 
const [offset, setOffset] = useState(0);

let limit = 6;

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
        .then((res) => setPets(res.data))
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

    return (  
        <>
        {pets.map(pet => {
            return (
                <div style={styles.petCard} key={pet.id}>
                    <div style={styles.petCardInner}>
                        <div 
                            style={styles.petPicture}
                        >
                                Place of Picture
                        </div>
                        <div style={styles.petTextBox}>
                            <div style={styles.petHeadline}>
                                <div style={styles.petStatus}>
                                    {pet.addstatus}
                                </div>
                                <div style={styles.petSpecies}>{pet.species}</div>
                                {/* to create unique id - uuid? */}
                                <div style={styles.petId}>#{pet.id}</div>
                                <div style={styles.petDate}>{pet.since}</div>
                                <div style={styles.petPlace}>
                                    <div>{pet.municipality} ({pet.region})</div>
                                </div>
                                <button style={styles.petProfileButton}>View Pet</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })}
            <div style={styles.pagination}>{numberIncreases().map(page => {
                    return (
                        <div 
                            onClick={() => setOffset(page * limit)} 
                            style={styles.paginationNumbers}
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