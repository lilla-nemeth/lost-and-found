import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export default function AuthContextProvider(props) {
    const [token, setToken] = useState(null);

    let DEBUG = true;

    // check if user and errorMsg are necessary!
    // const [user, setUser] = useState('');
    // const [errorMsg, setErrorMsg] = useState('');


    useEffect(() => {
        let tokenFromLocalStorage = localStorage.getItem('token');

        if (tokenFromLocalStorage) {
            setToken(tokenFromLocalStorage);
        }

    })
    
    function handleLogOut() {
        localStorage.removeItem('token');
        setToken(null);
    }

    if (!token) {
        <AuthContext.Provider value={setToken}>
            { props.children }
        </AuthContext.Provider>
    }
    return (
        <AuthContext.Provider value={token, handleLogOut}>
            { props.children }
        </AuthContext.Provider>
    );
}