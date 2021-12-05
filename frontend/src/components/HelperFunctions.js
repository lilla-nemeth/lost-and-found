import React from 'react';
import Sugar from 'sugar';  

export function numberIncreases(total, limit) {
    let numberOfPages = total / limit;  
    let numberArr = []

    for (let i = 0; i < numberOfPages; i++) {
        numberArr.push(i);
    }
    return numberArr;
}

// for only errors from backend (err.response.data.msg):
let timeOut;

export function handleError(err, setter) {
    setter(        
        err
        &&err.response
        &&err.response.data
        &&err.response.data.msg
    );

    timeOut = setTimeout(() => {
        setter('');
    }, 5000);
}

export function clearError() {
    clearTimeout(timeOut);
}

export function convertDate(timestamp) {
    let dateBySugar = Sugar.Date.create(timestamp)
    let formattedDateBySugar = Sugar.Date.format(dateBySugar, '{dd}/{MM}/{yyyy}');
    
    return formattedDateBySugar;
}

export function petDate(petstatus, since, until, className) {
    if (petstatus === 'lost' || petstatus === 'found') {
        return (
            <>
                <td className={className}>{petstatus}</td>
                <td className={className}>{convertDate(since)}</td>
            </>
        );
    } else {
        return (
            <>
                <td className={className}>{petstatus}</td>
                <td className={className}>{convertDate(until)}</td>
            </>
        );
    }
}

export function isInputEmpty(nameOfAttribute, attribute, className) {
    if (attribute === '') {
        return <td></td>
    } else {
        return (
            <>
                <td className={className}>{nameOfAttribute}</td>
                <td className={className}>{attribute}</td>
            </>
        );
    }
}

export function isFieldRequired(requiredField) {
    if (requiredField) {
        return '*';
    } else {
        return '(optional)';
    }
}

export function changeCheckboxValue(array, setArray, value) {
    if (array.includes(value)) {
        return setArray(array.filter(el => el != value));
    } else {
        return setArray([...array, value]);
    }
}

// Error message from frontend:
// export function requiredFieldsError(field, setter, fieldName) {
//     if (!field) {
//         return setter(`${fieldName} field is empty.`);
//     } 
// }


