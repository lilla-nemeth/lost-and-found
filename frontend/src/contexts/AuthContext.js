import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export default function AuthContextProvider(props) {

    const [token, setToken] = useState(null);

    let DEBUG = false;

    useEffect(() => {

       let tokenFromLocalStorage = localStorage.getItem('token');
    //    if (DEBUG) console.log('AUTH, USEEFFECT',tokenFromLocalStorage);

       if (tokenFromLocalStorage) {
           setToken(tokenFromLocalStorage);
       }

    },[]);
    
    // if (DEBUG) console.log(token);
    
    function handleLogOut() {
        localStorage.removeItem('token');
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{token, setToken, handleLogOut}}>
            { props.children }
        </AuthContext.Provider>
    );
}