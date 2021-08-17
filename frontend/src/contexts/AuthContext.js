import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [token, setToken] = useState(null);

    // check if user and errorMsg are necessary!
    // const [user, setUser] = useState('');
    // const [errorMsg, setErrorMsg] = useState('');


    // useEffect
    // logout

    return (
        // remember to add value to AuthContext.Provider! (contents what I want to give to the children as props)
        <AuthContext.Provider>
            { props.children }
        </AuthContext.Provider>
    );
}
 
export default AuthContextProvider;