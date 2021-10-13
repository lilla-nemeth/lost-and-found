import Sugar from 'sugar';    


export function convertDate(timestamp) {
    let dateBySugar = Sugar.Date.create(timestamp)
    let formattedDateBySugar = Sugar.Date.format(dateBySugar, '{dd}/{MM}/{yyyy}');
    
    return formattedDateBySugar;
}

export function petDate(petstatus, since, until, className) {
    if (petstatus === 'lost' || petstatus === 'found' ) {
        return <>
            <td className={className}>{petstatus}</td>
            <td className={className}>{convertDate(since)}</td>
        </>
    } else {
        return <>
            <td className={className}>{petstatus}</td>
            <td className={className}>{convertDate(until)}</td>
        </>
    }
}

export function isInputEmpty(nameOfAttribute, attribute, className) {
    if (attribute == '') {
        return <td></td>
    } else {
        return <>
            <td className={className}>{nameOfAttribute}</td>
            <td className={className}>{attribute}</td>
        </>
    }
}