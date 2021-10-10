import Sugar from 'sugar';    


export function convertDate(timestamp) {
    let dateBySugar = Sugar.Date.create(timestamp)
    let formattedDateBySugar = Sugar.Date.format(dateBySugar, '{dd}/{MM}/{yyyy}');
    
    return formattedDateBySugar;
}

export function petDate(petstatus, since, until) {
    if (petstatus === 'lost' || petstatus === 'found' ) {
        return petstatus + ': ' + convertDate(since) 
    } else {
        return petstatus + ': ' + convertDate(until) 
    }
}
