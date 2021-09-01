import axios from 'axios';
import React, { createContext, useState } from 'react';

export const ApiContext = createContext();

export default function ApiContextProvider(props) {
    
    let DEBUG = true;


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

    return (
        <ApiContext.Provider value={{registerUser}}>
            { props.children }
        </ApiContext.Provider>
    )
}