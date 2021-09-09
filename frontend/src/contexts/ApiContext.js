import React, { createContext, useContext } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';

export const ApiContext = createContext();

export default function ApiContextProvider(props) {
    
    let DEBUG = true;

    const { token } = useContext(AuthContext);

    // named input when we have many arguments
    // cannot mess up the order (in object {})
    function registerUser({email, username, phone, pw, success, error, successTimeout, errorTimeout}) {
        
        let options = {
            method: 'post',
            url: 'http://localhost:3003/register',
            // mode: 'cors',
            // headers: {
            //     'Content-Type': 'application/json',
            // },
            data: {
                email,
                username,
                phone,
                pw,
            },
        };

        axios(options)
        .then(
            res => {if (success) success(res.data.msg, successTimeout())}
        )
        .catch(
            err => {if (error) error(err.response.data.msg, errorTimeout())}
        )
    }

    // token from AuthContext ?
    // FIX IT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!:
    function loginUser({email, pw}) {

        // CHECK IT LATER: are mode and headers necessary?!
        let options = {
            method: 'post',
            url: 'http://localhost:3003/login',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
            data: {
                email,
                pw
            },
        };
        
        axios(options)
        .then(
            res => {console.log(res)}
        )
        .catch(
            err => {console.log(err)}
        )
    }

    // function reportPet() {
    // }

    return (
        <ApiContext.Provider value={{registerUser, loginUser}}>
            { props.children }
        </ApiContext.Provider>
    )
}